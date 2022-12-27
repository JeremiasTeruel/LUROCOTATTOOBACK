var express = require('express')
var router = express.Router()
const { todosArtistas, unArtista, agregarArtista, editarArtista, eliminarArtista } = require('../controllers/artistaController')


router.get('/', todosArtistas)
router.post('/', agregarArtista)
router.get('/:id', unArtista)
router.put('/:id', editarArtista)
router.delete('/:id', eliminarArtista)

module.exports = router