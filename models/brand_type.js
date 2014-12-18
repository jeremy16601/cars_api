/**
 * Created by xueqingli on 14/12/17.
 * 品牌类型--子分类
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Brand_TypeSchema = new Schema({
    childname: { //子分类
        type: String
    }, brand_type: {
        type: String
    }
}, {
    versionKey: false
});


var brands_TypeModel = mongoose.model('brandsList', Brand_TypeSchema);
exports.brands_TypeModel = brands_TypeModel;

//品牌列表
exports.brand_TypeList = function (req, res) {
    brands_TypeModel.find(function (err, doc) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
        res.json(doc);
    });
};


//增加二级品牌
exports.addBrandType = function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');

    var brandType = new brands_TypeModel({
        childname: req.body.childname,
        brand_type: req.body.brand_type
    });
    console.log(2323 + brandType);
    //新增
    brandType.save(function (err, doc) {
        if (err) {
            console.log('保存失败' + err);
            res.json({
                success: false
            });
        } else {
            console.log('保存成功！');
            res.json({
                success: true
            });
        }
    });
};

//根据brand_type查询品牌信息
exports.brandsTypeById = function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
    brands_TypeModel.find({
        brand_type: req.query.brand_type
    }, function (err, doc) {
        if (doc) {
            res.json(doc);
        } else {
            res.json(err);
        }
    });
};

