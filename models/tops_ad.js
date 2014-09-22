/**
 * Created by xueqingli on 14-9-22.
 * 顶部滑动广告
 */

var mongoose = require('mongoose');

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
