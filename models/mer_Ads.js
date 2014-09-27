/**
 * Created by xueqingli on 14-9-20.
 * 商户上传广告
 */


var mongoose = require('mongoose');
var mer_user = require('./merchant');

var Schema = mongoose.Schema;

var adsSchema = new Schema({
    nickname: { //发布广告的商家id
        type: String,
        ref: 'mer_user'
    },
    ad_type:{ //发布广告分类
        type:String
    },
    ad_image: { //广告图片
        type: String
    },
    ad_title: { //广告标题
        type: String
    },
    pro_name: { //产品名字
        type: String
    },
    company_name: { //公司名字或者店铺名字
        type: String
    },
    phone: { // 服务电话
        type: String
    },
    mer_href: { // 商家地址外链（美团或者其他网站的产品链接）
        type: String
    },
    pro_detail: { //产品详情
        type: String
    },
    pro_oldprice: { //产品原价
        type: String
    },
    pro_price: { //产品现价
        type: String
    },
    sing_price: { //单条价格
        type: String
    },
    pub_time: { //发布时间
        type: String
    },
    count: { //一天的条数
        type: String
    },
    days: { //天数
        type: String
    }
}, {
    versionKey: false
});


var adsModel = mongoose.model('mer_Ads', adsSchema);
exports.adsModel = adsModel;

//广告列表
exports.adsList = function (req, res) {
    adsModel.find(function (err, doc) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
        res.json(doc);
    });
};

//上传广告
exports.addAds = function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
    //获取当前时间
    var date = new Date();
    var time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();

    var mer_ads = new adsModel({
        nickname: req.body.nickname,
        ad_image: req.body.ad_image,
        ad_title: req.body.ad_title,
        pro_name: req.body.pro_name,
        phone: req.body.phone,
        mer_href: req.body.mer_href,
        pro_detail: req.body.pro_detail,
        pro_oldprice: req.body.pro_oldprice,
        pro_price: req.body.pro_price,
        sing_price: req.body.sing_price,
        pub_time: time,
        count: req.body.count,
        days: req.body.days
    });

    mer_ads.save(function (err, doc) {
        if (err) {
            console.log('上传失败' + err);
            res.json({
                success: false
            });
        } else {
            console.log('上传成功！');
            res.json({
                success: true
            });
        }

    });

};


//根据商户名查询广告信息
exports.adsFindByName = function (req, res) {
    adsModel.find({
        nickname: req.query.nickname
    }, function (err, doc) {
        if (doc) {
            res.json(doc);
        } else {
            res.json(err);
        }
    });

};