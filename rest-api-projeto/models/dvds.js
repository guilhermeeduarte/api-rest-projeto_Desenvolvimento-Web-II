var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var dvdSchema = new Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    ano: { type: Number },
    categoria: { type: String, required: true },
    preco: { type: Currency },
    autor: { type: Schema.Types.ObjectId, ref: 'Autor', required: true }
}, {
    timestamps: true
});

var DVDs = mongoose.model('DVD', dvdSchema);
module.exports = DVDs;