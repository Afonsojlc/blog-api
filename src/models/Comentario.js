const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema(
{
    conteudo: { type: String, required: true, trim: true },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilizador',
        required: true
    },
    artigo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artigo',
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Comentario', comentarioSchema);