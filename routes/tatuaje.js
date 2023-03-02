const express = require('express')
const router = express.Router()
let adminPassport = require('../config/adminPassport')

const { nuevoTatuaje, eliminarTatuaje, todosTatuajes, tatuajeArtista, unTatuaje } = require('../controllers/tatuajeController')

router.post('/', adminPassport.authenticate('jwt',{ session: false}), nuevoTatuaje)
router.get('/', todosTatuajes)
router.delete('/:id', adminPassport.authenticate('jwt',{ session: false}), eliminarTatuaje)
router.get('/:id', unTatuaje)
router.get('/artista', tatuajeArtista)

module.exports = router