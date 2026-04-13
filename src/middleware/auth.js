const jwt = require('jsonwebtoken');
const Utilizador = require('../models/Utilizador');

// Verifica se o token JWT é válido
exports.proteger = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
        return res.status(401).json({ erro: 'Não autenticado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.utilizador = await Utilizador.findById(decoded.id);
        next();
    } catch {
        return res.status(401).json({ erro: 'Token inválido' });
    }
};

// Restringe acesso por role
exports.autorizar = (...roles) => (req, res, next) => {
    if (!roles.includes(req.utilizador.role)) {
        return res.status(403).json({ erro: 'Sem permissão para esta ação' });
    }
    next();
};