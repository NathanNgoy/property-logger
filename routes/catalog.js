var express = require('express');
var router = express.Router();

// Require controller modules.
var product_controller = require('../controllers/productController');

// GET catalog home page.
router.get('/', product_controller.index);

module.exports = router;