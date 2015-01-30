/**
 * Created by xueqingli on 15/1/29.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var PeijianSchema = new Schema({
    id: {
        type: Number
    },Selected:{
        type:Boolean, default: false
    },title:{
        type:String
    },
    selectList:Schema.Types.Mixed
    //, p: {
    //    type: String
    //}
}, {
    versionKey: false
});


var peijianModel = mongoose.model('peijian', PeijianSchema);
exports.peijianModel = peijianModel;
//列表
exports.peijianList = function (req, res) {
    peijianModel.find(function (err, doc) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
        res.json(doc);
    });
};

//查询列表
exports.brandsFindByName = function (req, res) {
    brandsModel.findOne({
        brand_name: req.query.brand_name
    }, function (err, doc) {
        if (doc) {
            res.json(doc);
        } else {
            res.json(err);
        }
    });
};

//增加配件
exports.addPeijian = function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');

    var peijian = new peijianModel({
        id: req.body.id,
        selectList: req.body.selectList
    });
    peijianModel.findOne({
        brand_type: req.body.brand_type
    }, function (err, doc) {
        if (doc == null) {
            //新增
            peijian.save(function (err, doc) {
                if (err) {
                    console.log('保存失败');
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
        } else {
            console.log('保存失败');
            res.json({
                success: false
            });
        }
    });

};