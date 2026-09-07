const express = require('express');
const { body } = require('express-validator');
const ctrl = require('../controllers/authController');
const { proteger } = require('../middleware/auth');
const validar = require('../middleware/validar');

const router = express.Router();

// ==========================================
// 🛡️ Request Validation Schemas
// ==========================================
const registerValidation = [
    body('nome').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().isEmail().withMessage('Please provide a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

const loginValidation = [
    body('email').trim().isEmail().withMessage('Please provide a valid email address'),
    body('password').notEmpty().withMessage('Password is required')
];

// ==========================================
// 🔐 Authentication Endpoints
// ==========================================

// 1️⃣ POST /api/auth/register — Register a new user
router.post('/register', registerValidation, validar, ctrl.register);

// 2️⃣ POST /api/auth/login — Authenticate user and issue JWT token
router.post('/login', loginValidation, validar, ctrl.login);

// 3️⃣ GET /api/auth/me — Retrieve current authenticated user profile (Protected)
router.get('/me', proteger, ctrl.getMe);

module.exports = router;
