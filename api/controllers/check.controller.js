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
    console.log('RUT for Report:', rut);
    try{
        const checks = await Check.find({ rut: rut });

        // Contar los días trabajados
        const uniqueDates = [...new Set(checks.map(check => check.fecha))];
        const daysWorked = uniqueDates.length;

        // Contar los días menores de 8 horas
        const daysLessThan8Hours = checks.filter(check => check.tipo === "entrada" && check.hora < "08:00:00").length;
        
        // Calcular las horas extras
        const totalHoursWorked = checks.reduce((total, check) => {
            const [hours, minutes, seconds] = check.hora.split(":").map(Number);
            return total + hours + minutes / 60 + seconds / 3600;
        }, 0);
        const standardHoursWorked = daysWorked * 8;
        const extraHoursWorked = Math.max(0, totalHoursWorked - standardHoursWorked);
        
        const reportData = [{
            name: "Reporte",
            diasTrabajados: daysWorked,
            diasMenos8Horas: daysLessThan8Hours,
            horasExtras: parseFloat(extraHoursWorked.toFixed(2)),
        }];
            
        //console.log('Report Data:', reportData);

        res.status(200).json(reportData);

    }catch (error){
        console.error(error);
        res.status(500).send({ message: "Error al obtener el reporte." });
    }
};

module.exports = {
    createCheck,
    searchCheckByRut,
    deleteCheck,
    getReportData,
}