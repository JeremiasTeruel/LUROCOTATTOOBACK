var express = require('express');
var router = express.Router();
const productosRoutes = require('./producto')
const artistasRoutes = require('./artista')
const usuariosRoutes = require('./usuarios')
const tatuajesRoutes = require('./tatuaje')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'LUROCOTATTO'});
});

router.use('/productos', productosRoutes)
router.use('/artistas', artistasRoutes)
router.use('/usuarios', usuariosRoutes)
router.use('/tatuajes', tatuajesRoutes)


module.exports = router;
