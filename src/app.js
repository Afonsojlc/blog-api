const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Ligação à base de dados

// Carregar variáveis de ambiente e ligar BD
dotenv.config();
connectDB();

const app = express();

// Permite receber JSON no body
app.use(express.json());

// --- AS NOSSAS ROTAS OFICIAIS ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/artigos', require('./routes/artigos')); // A linha que devia estar a faltar!
app.use('/api/artigos/:artigoId/comentarios', require('./routes/comentarios'));
app.use('/api/comentarios', require('./routes/comentarios'));

// Rota não encontrada (O erro 404 que estavas a ver)
app.use((req, res) => {
    res.status(404).json({ erro: 'Rota não encontrada' });
});

// Middleware de erros (Fase 5)
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Ligar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor a correr na porta ${PORT}`);
});