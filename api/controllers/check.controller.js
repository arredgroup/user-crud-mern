const db = require("../models/mongodb");
const Check = db.check;

const createCheck = (req, res) => {
  const check = {};
  check.rut = req.body.rut;
  check.fecha = req.body.fecha;
  check.hora = req.body.hora;
  check.tipo = req.body.tipo;

  let checkModel = new Check(check);

  checkModel.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(user);
  });
};

const searchCheckByRut = (req, res) => {
  const rut = req.params.rut;
  Check.find({ rut: rut }, (err, checks) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(checks);
  });
};

const deleteCheck = (req, res) => {
  const fecha = req.query.fecha;
  const hora = req.query.hora;
  Check.deleteOne({ fecha: fecha, hora: hora }, (err, checks) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(checks);
  });
};

const getReporteGrafico = (req, res) => {
  const rut = req.params.rut;
  Check.find({ rut: rut }, (err, checks) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    let reportData = checks.reduce((acc, check) => {
      let date = check.fecha.split("T")[0]; // Obtiene solo la fecha sin la hora
      if (!acc.checksByDate[date]) {
        acc.checksByDate[date] = [];
      }
      acc.checksByDate[date].push(check);

      // Ordena las marcaciones por hora
      acc.checksByDate[date].sort((a, b) => a.hora.localeCompare(b.hora));

      // Calcula la cantidad total de horas trabajadas en el día
      let totalHours = 0;
      for (let i = 0; i < acc.checksByDate[date].length; i += 2) {
        let entrada = acc.checksByDate[date][i];
        let salida = acc.checksByDate[date][i + 1];
        if (entrada.tipo === 1 && salida.tipo === 2) {
          let hoursEntrada = parseInt(entrada.hora.split(":")[0]);
          let hoursSalida = parseInt(salida.hora.split(":")[0]);
          totalHours += hoursSalida - hoursEntrada;
        }
      }

      if (totalHours < 8) {
        acc.daysWorkedLessThanEightHours++;
      } else if (totalHours > 8) {
        acc.extraHoursWorked += totalHours - 8;
      }

      acc.daysWorked++;

      return acc;
    }, {
      daysWorked: 0,
      daysWorkedLessThanEightHours: 0,
      extraHoursWorked: 0,
      checksByDate: {}
    });

    let reportDataArray = [
      { name: "Días trabajados", value: reportData.daysWorked },
      {
        name: "Días trabajados menos de 8 horas",
        value: reportData.daysWorkedLessThanEightHours,
      },
      { name: "Horas extras trabajadas", value: reportData.extraHoursWorked },
    ];

    res.status(200).send(reportDataArray);
  });
};


module.exports = {
  createCheck,
  searchCheckByRut,
  deleteCheck,
  getReporteGrafico,
};
