const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    nombre: {type: String},
    imagen: {type: String},
    descripcion: {type: String},
})

const Artista = mongoose.model(
    'artistas',
    schema
)

module.exports = Artista