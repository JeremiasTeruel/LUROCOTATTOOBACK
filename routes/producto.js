var express = require('express')
var router = express.Router()
let adminPassport = require('../config/adminPassport')
const {crearProducto, unProducto, eliminarProducto, productos} = require('../controllers/productoController')

router.get('/', productos)
router.post('/', adminPassport.authenticate('jwt',{ session: false}), crearProducto)
router.get('/:id', unProducto)
router.delete('/:id', adminPassport.authenticate('jwt',{ session: false}), eliminarProducto)

module.exports = router