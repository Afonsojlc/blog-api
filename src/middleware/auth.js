const jwt = require('jsonwebtoken');
const Utilizador = require('../models/Utilizador');

// Middleware to verify JWT authentication token
exports.proteger = async (req, res, next) => {
    let token;

    // 1. Check for Bearer token in the Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ erro: 'Not authorized: token missing' });
    }

    try {
        // 2. Verify token signature and expiration
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');

        // 3. Attach current user instance to request object
        req.utilizador = await Utilizador.findById(decoded.id);
        if (!req.utilizador) {
            return res.status(401).json({ erro: 'User belonging to this token no longer exists' });
        }

        next();
    } catch {
        return res.status(401).json({ erro: 'Invalid or expired token' });
    }
};

// Middleware to restrict access based on user role (e.g. 'admin')
exports.autorizar = (...roles) => (req, res, next) => {
    if (!roles.includes(req.utilizador.role)) {
        return res.status(403).json({ erro: 'Access forbidden: insufficient role permissions' });
    }
    next();
};
