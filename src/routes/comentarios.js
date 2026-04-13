const express = require('express');
const { body } = require('express-validator');
const ctrl = require('../controllers/comentarioController');
const { proteger } = require('../middleware/auth');
const validar = require('../middleware/validar');

const router = express.Router({ mergeParams: true });

// GET /api/artigos/:id/comentarios - Lista comentários de um artigo
router.get('/', ctrl.listar);

// POST /api/artigos/:id/comentarios - Adiciona comentário (Protegido)
router.post('/', 
    proteger,
    [
        body('conteudo').notEmpty().withMessage('Conteúdo obrigatório')
    ],
    validar, 
    ctrl.criar
);

// DELETE /api/comentarios/:id - Apaga comentário próprio (Protegido)
router.delete('/:id', proteger, ctrl.apagar);

module.exports = router;