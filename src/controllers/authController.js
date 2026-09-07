const jwt = require('jsonwebtoken');
const Utilizador = require('../models/Utilizador');

// Generate a signed JWT token with configurable expiration
const gerarToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_key', {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });

// POST /api/auth/register — Register a new user
exports.register = async (req, res, next) => {
    try {
        const { nome, email, password, role } = req.body;
        const utilizador = await Utilizador.create({
            nome,
            email,
            password,
            ...(role && { role })
        });
        const token = gerarToken(utilizador._id);
        res.status(201).json({
            token,
            utilizador: {
                id: utilizador._id,
                nome: utilizador.nome,
                email: utilizador.email,
                role: utilizador.role
            }
        });
    } catch (err) {
        next(err);
    }
};

// POST /api/auth/login — Authenticate user credentials
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Retrieve user and explicitly include password field (excluded by default)
        const utilizador = await Utilizador.findOne({ email }).select('+password');
        if (!utilizador || !(await utilizador.compararPassword(password))) {
            return res.status(401).json({ erro: 'Invalid email or password' });
        }

        const token = gerarToken(utilizador._id);
        res.json({
            token,
            utilizador: {
                id: utilizador._id,
                nome: utilizador.nome,
                email: utilizador.email,
                role: utilizador.role
            }
        });
    } catch (err) {
        next(err);
    }
};

// GET /api/auth/me — Retrieve authenticated user profile
exports.getMe = async (req, res) => {
    res.json({ utilizador: req.utilizador });
};
