var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('productDetail.hbs',{ title: "Descripcion del producto"});
});

module.exports = router;
