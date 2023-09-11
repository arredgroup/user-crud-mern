const authMiddleware = (req,res, next) => {
    const token = req.headers['x-auth-token'];
    if(!token){
        return res.status(401).json({msg: 'No hay token, permiso no válido'})
    }
    next();
}

module.exports = authMiddleware;