const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const utilizadorSchema = new mongoose.Schema({
    nome: { type: String, required: true, trim: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        trim: true 
    },
    password: { type: String, required: true, minlength: 6, select: false },
    role: { type: String, enum: ['autor', 'admin'], default: 'autor' }
}, { timestamps: true });

// Hash automático antes de guardar (Corrigido para Mongoose 8+)
utilizadorSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);
});

// Método de instância para comparar passwords
utilizadorSchema.methods.compararPassword = async function (pw) {
    return bcrypt.compare(pw, this.password);
};

module.exports = mongoose.model('Utilizador', utilizadorSchema);