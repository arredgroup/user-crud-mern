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



const getReportData = (req, res) => {
  const rut = req.params.rut;
  Check.find({ rut: rut }, (err, checks) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    let reportData = {
      daysWorked: 0,
      daysWorkedLessThanEightHours: 0,
      extraHoursWorked: 0,
    };

    let checksByDate = {};
    checks.forEach((check) => {
      let date = check.fecha.split("T")[0];
      if (!checksByDate[date]) {
        checksByDate[date] = [];
      }
      checksByDate[date].push(check);
    });

    for (let date in checksByDate) {
      let checks = checksByDate[date];
      reportData.daysWorked++;

      checks.sort((a, b) => a.hora.localeCompare(b.hora));

      let totalHours = 0;
      for (let i = 0; i < checks.length; i += 2) {
        let entrada = checks[i];
        let salida = checks[i + 1];
        if (entrada.tipo === 1 && salida.tipo === 2) {
          let hoursEntrada = parseInt(entrada.hora.split(":")[0]);
          let hoursSalida = parseInt(salida.hora.split(":")[0]);
          totalHours += hoursSalida - hoursEntrada;
        }
      }

      if (totalHours < 8) {
        reportData.daysWorkedLessThanEightHours++;
      } else if (totalHours > 8) {
        reportData.extraHoursWorked += totalHours - 8;
      }
    }

    let reportDataArray = [
      { name: "Días trabajados", value: reportData.daysWorked },
      {
        name: "Días trabajados menos de 8 horas",
        value: reportData.daysWorkedLessThanEightHours,
      },
      { name: "Horas extras trabajadas", value: reportData.extraHoursWorked },
    ];

    /* // Transforma los datos aquí
    let transformedData = reportDataArray.map(data => {
      return { name: data.name, value: data.value };
    }); */

    res.status(200).send(reportDataArray);
  });
};

module.exports = {
  createCheck,
  searchCheckByRut,
  deleteCheck,
  getReportData,
};