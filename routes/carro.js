const {
    agregarAlCarro,
    limpiarCarro,
    getCarro
} = require('../controllers/carroController')
var express = require('express')
var router = express.Router()

router.post('/', agregarAlCarro)
router.delete('/', limpiarCarro)
router.get('/', getCarro)

module.exports = router