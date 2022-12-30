var express = require('express')
var router = express.Router()
const { agregarTattoo } = require('../controllers/tattooController')


router.post('/', agregarTattoo)

module.exports = router