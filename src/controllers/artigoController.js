const Artigo = require('../models/Artigo');

// GET /api/artigos — List published articles with pagination and category filtering
exports.listar = async (req, res, next) => {
    try {
        const { categoria, page = 1, limit = 10 } = req.query;
        const filtro = { publicado: true };

        if (categoria) filtro.categoria = categoria;

        const total = await Artigo.countDocuments(filtro);
        const artigos = await Artigo.find(filtro)
            .populate('autor', 'nome email')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.json({
            total,
            page: Number(page),
            totalPaginas: Math.ceil(total / limit),
            artigos
        });
    } catch (err) {
        next(err);
    }
};

// GET /api/artigos/:id — Retrieve a single article by ID
exports.obter = async (req, res, next) => {
    try {
        const artigo = await Artigo.findById(req.params.id)
            .populate('autor', 'nome email');

        if (!artigo) {
            return res.status(404).json({ erro: 'Article not found' });
        }

        res.json({ artigo });
    } catch (err) {
        next(err);
    }
};

// POST /api/artigos — Create a new article (Protected)
exports.criar = async (req, res, next) => {
    try {
        const artigo = await Artigo.create({
            ...req.body,
            autor: req.utilizador._id
        });

        res.status(201).json({ artigo });
    } catch (err) {
        next(err);
    }
};

// PUT /api/artigos/:id — Update an existing article (Author or Admin only)
exports.atualizar = async (req, res, next) => {
    try {
        const artigo = await Artigo.findById(req.params.id);

        if (!artigo) {
            return res.status(404).json({ erro: 'Article not found' });
        }

        // Verify author ownership or admin role
        if (artigo.autor.toString() !== req.utilizador._id.toString() && req.utilizador.role !== 'admin') {
            return res.status(403).json({ erro: 'Access denied: insufficient permissions' });
        }

        const atualizado = await Artigo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json({ artigo: atualizado });
    } catch (err) {
        next(err);
    }
};

// DELETE /api/artigos/:id — Delete an article (Author or Admin only)
exports.apagar = async (req, res, next) => {
    try {
        const artigo = await Artigo.findById(req.params.id);

        if (!artigo) {
            return res.status(404).json({ erro: 'Article not found' });
        }

        // Verify author ownership or admin role
        if (artigo.autor.toString() !== req.utilizador._id.toString() && req.utilizador.role !== 'admin') {
            return res.status(403).json({ erro: 'Access denied: insufficient permissions' });
        }

        await artigo.deleteOne();
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
