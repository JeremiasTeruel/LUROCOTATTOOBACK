const {
    agregarAlCarro,
    limpiarCarro
} = require('../controllers/carroController')
var express = require('express')
var router = express.Router()

router.post('/', agregarAlCarro)
router.delete('/', limpiarCarro)

module.exports = router