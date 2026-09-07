const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB Database
connectDB();

const app = express();

// ==========================================
// 🌐 Global Middlewares
// ==========================================
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(express.json()); // Parses incoming requests with JSON payloads

// ==========================================
// 🚀 API Routes
// ==========================================
// Authentication
app.use('/api/auth', require('./routes/auth'));

// Articles / Posts (Supports both Portuguese and English route aliases)
app.use('/api/artigos', require('./routes/artigos'));
app.use('/api/posts', require('./routes/artigos'));

// Comments (Nested under articles & direct endpoints)
app.use('/api/artigos/:artigoId/comentarios', require('./routes/comentarios'));
app.use('/api/posts/:artigoId/comments', require('./routes/comentarios'));
app.use('/api/comentarios', require('./routes/comentarios'));
app.use('/api/comments', require('./routes/comentarios'));

// ==========================================
// 🛡️ Error & 404 Handling Middlewares
// ==========================================
// 404 Route Not Found
app.use((req, res) => {
    res.status(404).json({ erro: 'Route not found' });
});

// Centralized Error Handler (Catches CastError, 11000 duplicate keys, ValidationError)
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Blog API running on port ${PORT} (http://localhost:${PORT})`);
});
