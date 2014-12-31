/**
 * Created by jeremy on 14-12-31.
 * 添加订单
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var orderSchema = new Schema({
    username: {
        type: String
    }, address: {
        type: String
    }, chepai: {
        type: String
    }, datetime: {
        type: String
    }, tel: {
        type: String
    }, regtime: {
        type: String
    }, fadongjiNo: {
        type: String
    }, vin: {
        type: String
    }, fapiao: {
        type: String
    }, beizhu: {
        type: String
    }, payType: {
        type: String
    }
}, {
    versionKey: false
});


var orderModel = mongoose.model('orderList', orderSchema);
exports.orderModel = orderModel;

exports.orderList = function (req, res) {
    orderModel.find(function (err, doc) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
        res.json(doc);
    });
};


//增加二级品牌
exports.addOrder = function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');

    var order = new orderModel({
        username: req.body.username,
        address: req.body.address,
        chepai: req.body.chepai,
        datetime: req.body.datetime,
        tel: req.body.tel,
        regtime: req.body.regtime,
        fadongjiNo: req.body.fadongjiNo,
        vin: req.body.vin,
        fapiao: req.body.fapiao,
        beizhu: req.body.beizhu,
        payType: req.body.payType
    });
    //新增
    order.save(function (err, doc) {
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

