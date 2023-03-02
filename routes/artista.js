var express = require('express')
var router = express.Router()
let adminPassport = require('../config/adminPassport')
const { todosArtistas, unArtista, agregarArtista, editarArtista, eliminarArtista } = require('../controllers/artistaController')


router.get('/', todosArtistas)
router.post('/', adminPassport.authenticate('jwt',{ session: false}), agregarArtista)
router.get('/:id', unArtista)
router.put('/:id', adminPassport.authenticate('jwt',{ session: false}), editarArtista)
router.delete('/:id', adminPassport.authenticate('jwt',{ session: false}), eliminarArtista)

module.exports = router