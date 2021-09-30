var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('product.hbs',{ title: "Procutos"});
});

module.exports = router;
