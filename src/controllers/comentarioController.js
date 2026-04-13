const Comentario = require('../models/Comentario');
const Artigo = require('../models/Artigo');

// GET /api/artigos/:artigoId/comentarios
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

// POST /api/artigos/:artigoId/comentarios
exports.criar = async (req, res, next) => {
    try {
        const artigo = await Artigo.findById(req.params.artigoId);
        
        if (!artigo) {
            return res.status(404).json({ erro: 'Artigo não encontrado' });
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

// DELETE /api/comentarios/:id
exports.apagar = async (req, res, next) => {
    try {
        const comentario = await Comentario.findById(req.params.id);
        
        if (!comentario) {
            return res.status(404).json({ erro: 'Comentário não encontrado' });
        }
        
        // Verifica se quem está a apagar é o verdadeiro autor do comentário
        if (comentario.autor.toString() !== req.utilizador._id.toString()) {
            return res.status(403).json({ erro: 'Sem permissão' });
        }
        
        await comentario.deleteOne();
        res.status(204).send();
    } catch (err) { 
        next(err); 
    }
};