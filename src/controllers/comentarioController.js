const Comentario = require('../models/Comentario');
const Artigo = require('../models/Artigo');

// GET /api/artigos/:artigoId/comentarios — List all comments for an article
exports.listar = async (req, res, next) => {
    try {
        const comentarios = await Comentario
            .find({ artigo: req.params.artigoId })
            .populate('autor', 'nome')
            .sort({ createdAt: -1 });

        res.json({ comentarios });
    } catch (err) {
        next(err);
    }
};

// POST /api/artigos/:artigoId/comentarios — Create a comment on an article (Protected)
exports.criar = async (req, res, next) => {
    try {
        const artigo = await Artigo.findById(req.params.artigoId);

        if (!artigo) {
            return res.status(404).json({ erro: 'Article not found' });
        }

        const comentario = await Comentario.create({
            conteudo: req.body.conteudo,
            autor: req.utilizador._id,
            artigo: req.params.artigoId
        });

        res.status(201).json({ comentario });
    } catch (err) {
        next(err);
    }
};

// DELETE /api/comentarios/:id — Delete a comment (Author or Admin only)
exports.apagar = async (req, res, next) => {
    try {
        const comentario = await Comentario.findById(req.params.id);

        if (!comentario) {
            return res.status(404).json({ erro: 'Comment not found' });
        }

        // Verify that the requester is the comment author or an admin
        if (comentario.autor.toString() !== req.utilizador._id.toString() && req.utilizador.role !== 'admin') {
            return res.status(403).json({ erro: 'Access denied: insufficient permissions' });
        }

        await comentario.deleteOne();
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
