const mongoose = require('mongoose')

const tatuajesSchema = new mongoose.Schema({
    imagen: {type: String, required: true,},
    artista: {type: mongoose.Types.ObjectId, ref: 'artistas'}
})

const tatuajesModel = mongoose.model(
    'tatuajes',
    tatuajesSchema
)

module.exports = tatuajesModel