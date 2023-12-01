const validateRUT = (req, res, next) => {
    const rut = req.params.rut || req.body.rut;
    if (!rut) {
        return res.status(400).json({ msg: 'El RUT es requerido' });
    }
    next();
}

module.exports = validateRUT;