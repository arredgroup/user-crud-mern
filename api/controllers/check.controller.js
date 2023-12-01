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
}

const searchCheckByRut = (req, res) => {
    const rut = req.params.rut;
    Check.find({ rut: rut }, (err, checks) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send(checks);
    });
}

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
}

const getReportData = async (req, res) => {
    const rut = req.params.rut;
    try {
        const checks = await Check.find({ rut: rut });
        // Contar días trabajados
        const uniqueDates = [...new Set(checks.map(check => check.fecha))];
        const daysWorked = uniqueDates.length;
        // Contar días menos de 8 horas
        const daysLessThan8Hours = checks.filter(check => check.tipo === "entrada" && check.hora < "08:00:00").length;
        // Calcular horas extras
        const totalHoursWorked = checks.reduce((total, check) => {
            const [hours, minutes, seconds] = check.hora.split(":").map(Number);
            return total + hours + minutes / 60 + seconds / 3600;
        }, 0);
        const standardHoursWorked = daysWorked * 8;
        const extraHoursWorked = Math.max(0, totalHoursWorked - standardHoursWorked);
        res.status(200).json({
            daysWorked: daysWorked,
            daysLessThan8Hours: daysLessThan8Hours,
            extraHoursWorked: extraHoursWorked.toFixed(2), // Redondear a dos decimales
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al obtener el informe." });
    }
};

module.exports = {
    createCheck,
    searchCheckByRut,
    deleteCheck,
    getReportData,
}