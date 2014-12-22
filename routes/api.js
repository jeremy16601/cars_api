var express = require('express');
var router = express.Router();
var Brands = require('../models/brands');
var BrandType = require('../models/brand_type');
var BrandTT = require('../models/brand3')

//品牌列表
router.get('/getbrandsList', Brands.brandsList);
//添加品牌
router.post('/addBrands', Brands.addBrands);
//添加品牌列表分类
router.post('/addBrandType', BrandType.addBrandType);
//添加排量信息
router.post('/addBrandTT', BrandTT.addBrandTT);
//根据品牌id查询分类
router.get('/brandsTypeById', BrandType.brandsTypeById);
//根据分类id查询排量信息
router.get('/brandTT', BrandTT.getBrandList);

router.get('/stu_answer', function (req, res) {

    setTimeout(function () {
            res.json({status: 0});
        },
        2000);
});

module.exports = router;
