const express = require('express')
const router = express.Router()

const { nuevoTatuaje, eliminarTatuaje, todosTatuajes, tatuajeArtista, unTatuaje } = require('../controllers/tatuajeController')

router.post('/', nuevoTatuaje)
router.get('/', todosTatuajes)
router.delete('/:id',eliminarTatuaje)
router.get('/:id', unTatuaje)
router.get('/artista', tatuajeArtista)

module.exports = router