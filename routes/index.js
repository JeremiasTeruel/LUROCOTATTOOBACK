var express = require('express');
var router = express.Router();
const productosRoutes = require('./producto')
const artistasRoutes = require('./artista')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'LUROCOTATTO'});
});

router.use('/productos', productosRoutes)
router.use('/artistas', artistasRoutes)


module.exports = router;
