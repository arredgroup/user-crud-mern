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

    let checksByDate = checks.reduce((acc, check) => {
      let date = check.fecha.split("T")[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(check);
      return acc;
    }, {});

    for (let date in checksByDate) {
      let checks = checksByDate[date];
      reportData.daysWorked++;
      checks.sort((a, b) => a.hora.localeCompare(b.hora));
      
      let totalHours = checks
      .map((check, i) => {
      if (i % 2 === 0 && check.tipo === 1 && checks[i + 1].tipo === 2) {
      let [hoursEntrada] = check.hora.split(":").map(Number);
      let [hoursSalida] = checks[i + 1].hora.split(":").map(Number);
      return hoursSalida - hoursEntrada;
    }
    return 0;
  }).reduce((a, b) => a + b, 0);

      if (totalHours < 8) {
        reportData.daysWorkedLessThanEightHours++;
      } else if (totalHours > 8) {
        reportData.extraHoursWorked += totalHours - 8;
      }
    }

    let reportDataArray = [
      { name: "Días checkeado", value: reportData.daysWorked },
      {
        name: "Días Cheackeados con - de 8 horas ",
        value: reportData.daysWorkedLessThanEightHours,
      },
      { name: "Horas extras ", value: reportData.extraHoursWorked },
    ];

    res.status(200).send(reportDataArray);
  });
};

//actualiza un documento y asegura que la respuesta contenga el documento actualizado
const updateCheck = (req, res) => {
  const id = req.params.id;
  Check.findByIdAndUpdate(id, req.body, { new: true }, (err, check) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(check);
  });
};

module.exports = {
  createCheck,
  searchCheckByRut,
  deleteCheck,
  getReportData,
  updateCheck,
};