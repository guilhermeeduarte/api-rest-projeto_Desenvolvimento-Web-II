var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var autorSchema = new Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: true },
    tipoArtista: { type: String, required: true }
}, {
    timestamps: true
});

var Autores = mongoose.model('Autor', autorSchema);
module.exports = Autores;