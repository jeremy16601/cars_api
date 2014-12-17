var express = require('express');
var router = express.Router();
var Brands = require('../models/brands.js');

router.get('/gbrandsList', Brands.brandsList);

module.exports = router;
