const { validationResult } = require('express-validator');

// Middleware to evaluate express-validator results and format 400 response
const validar = (req, res, next) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
        return res.status(400).json({ erros: erros.array() });
    }
    next();
};

module.exports = validar;
