const jwt = require('jsonwebtoken');
const Utilizador = require('../models/Utilizador');

const proteger = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
        return res.status(401).json({ erro: 'Não autenticado' });
    }

    try {
        const descodificado = jwt.verify(token, process.env.JWT_SECRET);
        req.utilizador = await Utilizador.findById(descodificado.id);
        next();
    } catch (error) {
        res.status(401).json({ erro: 'Não autenticado' });
    }
};

module.exports = proteger;