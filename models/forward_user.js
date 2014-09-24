/**
 * Created by xueqingli on 14-9-24.
 * 转发人
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var forwardSchema = new Schema({
    f_nickname: { //转发人
        type: String
    },
    f_adsID: { //广告id
        type: String
    }},{
    versionKey: false
});

var forwardModel = mongoose.model('forward_user', forwardSchema);
exports.forwardModel = forwardModel;

//列表
exports.forwardUserList = function (req, res) {
    forwardModel.find(function (err, doc) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
        res.json(doc);
    });
};

//根据用户名查询用户信息
exports.forwardListByAdsID = function (req, res) {
    forwardModel.find({
        f_adsID: req.query.adsID
    }, function (err, doc) {
        if (doc) {
            res.json(doc);
        } else {
            res.json({"data": "暂无数据！"});
        }
    });

};

//存储转发人
exports.addForwardUsers = function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');

    var forwardUser=new forwardModel({
        f_nickname:req.body.f_nickname,
        f_adsID:req.body.f_adsID
    });

    forwardUser.save(function (err, doc) {
        if (err) {
            console.log('转发失败' + err);
            res.json({
                success: false
            });
        } else {
            console.log('转发成功！');
            res.json({
                success: true
            });
        }

    });
};