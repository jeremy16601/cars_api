/**
 * Created by jeremy on 14-12-18.
 * 排量
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Brand3chema = new Schema({
    title: {
        type: String
    }, brand3_type: {
        type: String
    }, brand3_time: {
        type: String
    }, brands3_id: {
        type: Schema.ObjectId,
        ref: 'brandsList'
    }
}, {
    versionKey: false
});


var brand3Model = mongoose.model('brandTT', Brand3chema);
exports.brand3Model = brand3Model;


//增加关联排量
exports.addBrandTT = function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');

    var brand3 = new brand3Model({
        title: req.body.title,
        brand3_type: req.body.brand3_type,
        brand3_time: req.body.brand3_time,
        brands3_id: req.body.brands3_id
    });
    //新增
    brand3.save(function (err, doc) {
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
exports.getBrandList = function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
    brand3Model.find({
        brands3_id: req.query.brandsid
    }, function (err, doc) {
        if (doc) {
            res.json(doc);
        } else {
            res.json(err);
        }
    });
};

