/**
 * Created by xueqingli on 14-9-27.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var paySchema = new Schema({
    alipay: { //alipay
        type: String
    },
    nickname: { //用户昵称
        type: String
    },imei:{
        type:String
    }},{
    versionKey: false
});

var payModel = mongoose.model('pay', paySchema);
exports.payModel = payModel;

//列表
exports.payList = function (req, res) {
    payModel.find(function (err, doc) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
        res.json(doc);
    });
};

//上传
exports.addPay = function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');

    var pay=new payModel({
        alipay:req.body.alipay,
        nickname:req.body.nickname,
        imei:req.body.imei
    });

    pay.save(function (err, doc) {
        if (err) {
            console.log('上传失败' + err);
            res.json({
                success: false
            });
        } else {
            console.log('上传成功！'+doc);
            res.json({
                success: true
            });
        }

    });
}