const validateRUT = (req, res, next) => {
    const rut = req.params.rut;
    if (!rut) {
        return res.status(400).json({ msg: 'El RUT es requerido' });
    }
    next();
}

module.exports = validateRUT;