const express = require('express')
const router = express.Router()

const { nuevoTatuaje, eliminarTatuaje, todosTatuajes, tatuajeArtista } = require('../controllers/tatuajeController')

router.post('/', nuevoTatuaje)
router.get('/', todosTatuajes)
router.delete('/:id',eliminarTatuaje)
router.get('/:id', tatuajeArtista)

module.exports = router