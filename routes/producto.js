var express = require('express')
var router = express.Router()
const {crearProducto, unProducto, eliminarProducto, productos} = require('../controllers/productoController')

router.get('/', productos)
router.post('/', crearProducto)
router.get('/:id', unProducto)
router.delete('/:id', eliminarProducto)

module.exports = router