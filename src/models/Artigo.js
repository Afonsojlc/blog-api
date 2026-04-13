const mongoose = require('mongoose');

const artigoSchema = new mongoose.Schema(
{
    titulo: { type: String, required: true, trim: true },
    conteudo: { type: String, required: true },
    categoria: { type: String, required: true, enum: ['tecnologia','ciência','desporto','cultura','outro'] },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilizador',
        required: true
    },
    publicado: { type: Boolean, default: false },
    imagem: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Artigo', artigoSchema);