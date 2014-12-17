var express = require('express');
var router = express.Router();
var Brands = require('../models/brands');
var BrandType=require('../models/brand_type');

//品牌列表
router.get('/gbrandsList', Brands.brandsList);
//添加品牌
router.post('/addBrands',Brands.addBrands);
//添加品牌列表分类
router.post('/addBrandType',BrandType.addBrandType);

module.exports = router;
