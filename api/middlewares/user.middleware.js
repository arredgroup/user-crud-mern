const validateID = (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ msg: 'El ID es requerido' });
    }
    if ( isNaN(id) ) {
        return res.status(401).json({msg: 'El ID es inválido'});
    }
    next();
}

module.exports = validateID;