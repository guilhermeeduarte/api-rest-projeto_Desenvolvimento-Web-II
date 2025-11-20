var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var livroSchema = new Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    ano: { type: Number },
    categoria: { type: String, required: true },
    preco: { type: Currency },
    autor: { type: Schema.Types.ObjectId, ref: 'Autor', required: true }
}, {
    timestamps: true
});

var Livros = mongoose.model('Livro', livroSchema);
module.exports = Livros;