/**
 * Created by xueqingli on 14-9-22.
 * 顶部滑动广告
 */

var mongoose = require('mongoose');
var fs = require('fs');
var Schema = mongoose.Schema;

var topsSchema = new Schema({
    img_path: { //图片路径
        type: String
    },
    img_href: { //图片链接
        type: String
    }},{
    versionKey: false
});



var topsModel = mongoose.model('tops_ads', topsSchema);
exports.topsModel = topsModel;

//广告列表
exports.adsTopList = function (req, res) {
    topsModel.find(function (err, doc) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
        res.json(doc);
    });
};

//上传广告
exports.addTopAds = function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');

//    var tmp_path, target_path;
//    if (req.files.imgfName.size > 0) { //表示有图片文件上传
//        tmp_path = req.files.img_name.path;
//        // 指定文件上传后的目录 - 示例为"images"目录。
//        target_path = './public/images/' + time + req.files.img_name.name;
//        // 移动文件
//        fs.rename(tmp_path, target_path, function(err) {
//            if (err) throw err;
//            //程序执行到这里，user文件下面就会有一个你上传的图片
//            imageMagick(target_path)
//                .resize(270, 170, '!') //加('!')强行把图片缩放成对应尺寸150*150！
//                .autoOrient()
//                .write(target_path, function(err) {
//                    if (err) {
//                        console.log(err);
//                    }
//                });
//        });
//    }

    var topAds=new topsModel({
        img_path:req.body.img_path,
        img_href:req.body.img_href
    });

    topAds.save(function (err, doc) {
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