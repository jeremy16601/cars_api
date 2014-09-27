/**
 * Created by xueqingli on 14-9-27.
 * 返利接口
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var profitSchema = new Schema({
    img_path: { //图片路径
        type: String
    },
    img_href: { //图片链接
        type: String
    }},{
    versionKey: false
});