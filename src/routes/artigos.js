const express = require('express');
const { body } = require('express-validator');
const ctrl = require('../controllers/artigoController');
const { proteger } = require('../middleware/auth'); 
const validar = require('../middleware/validar'); 

const router = express.Router();

const validacaoArtigo = [
    body('titulo').notEmpty().withMessage('Titulo obrigatório'),
    body('conteudo').notEmpty().withMessage('Conteúdo obrigatório'),
    body('categoria')
        .isIn(['tecnologia', 'ciência', 'desporto', 'cultura', 'outro'])
        .withMessage('Categoria inválida')
];

router.get('/', ctrl.listar);
router.get('/:id', ctrl.obter);
// É ESTA LINHA ABAIXO QUE O POSTMAN ESTÁ A PROCURAR
router.post('/', proteger, validacaoArtigo, validar, ctrl.criar); 
router.put('/:id', proteger, validacaoArtigo, validar, ctrl.atualizar);
router.delete('/:id', proteger, ctrl.apagar);

module.exports = router;