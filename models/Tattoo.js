const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    nombre: {type: String},
    imagen: {type: String},
    descripcion: {type: String},
    artista: {type: mongoose.Types.ObjectId, ref: 'artistas'},
})

const Tattoo = mongoose.model(
    'tattoos',
    schema
)

module.exports = Tattoo