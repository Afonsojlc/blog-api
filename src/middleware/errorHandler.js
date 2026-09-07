// Centralized Express error-handling middleware
const errorHandler = (err, req, res, next) => {
    console.error('Error Trace:', err.stack || err.message);

    // Mongoose Invalid ObjectId Error (CastError)
    if (err.name === 'CastError') {
        return res.status(400).json({ erro: 'Resource not found: Invalid ID format' });
    }

    // Mongoose Duplicate Key Error (code 11000, e.g. email uniqueness)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(400).json({ erro: `Field '${field}' is already in use` });
    }

    // Mongoose Validation Error (Schema constraint failure)
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({ erro: messages.join(', ') });
    }

    // Generic Internal Server Error
    res.status(err.statusCode || 500).json({
        erro: err.message || 'Internal server error'
    });
};

module.exports = errorHandler;
