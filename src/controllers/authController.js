const jwt = require('jsonwebtoken');
const Utilizador = require('../models/Utilizador');
// Gera um token JWT
const gerarToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN });

// POST /api/auth/register
exports.register = async (req, res, next) => {
    try {
        const { nome, email, password } = req.body;
        const utilizador = await Utilizador.create(
            { nome, email, password }
        );
        const token = gerarToken(utilizador._id);
        res.status(201).json({ token, utilizador: {
            id: utilizador._id, nome: utilizador.nome,
            email: utilizador.email, role: utilizador.role
        }});
    } catch (err) { next(err); }
    };
// POST /api/auth/login
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Buscar utilizador e incluir o campo password
        const utilizador = await Utilizador
        .findOne({ email }).select('+password');
        if (!utilizador ||
        !(await utilizador.compararPassword(password))) {
            return res.status(401).json(
            { erro: 'Email ou password incorretos' }
            );
        }
        const token = gerarToken(utilizador._id);
        res.json({ token });
    } catch (err) { next(err); }
};

// GET /api/auth/me
exports.getMe = async (req, res) => {
    res.json({ utilizador: req.utilizador });
};