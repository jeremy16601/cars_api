/**
 * Created by xueqingli on 14-9-15.
 * 商户中心
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MerUsersSchema = new Schema({
    nickname: { //用户昵称
        type: String
    },
    password: { //密码
        type: String
    },
    address: {//用户住址
        type: String
    },
    tel: {//电话
        type: String
    },
    alipay: { //用户支付宝
        type: String
    },
    headimgurl: { // 用户头像
        type: String
    },
    sex: { // 用户性别
        type: String
    },
    birthday: { //用户生日
        type: String
    },
    age: { //用户年龄
        type: String
    },
    constellation: { //星座
        type: String
    },
    signature: { //个性签名
        type: String
    },
    work: { //用户工作
        type: String
    },
    createtime: { //注册时间
        type: String
    },
    yesterday_Profit: { //昨日获利
        type: String
    },
    login_Status: { //用户登录状态
        type: String
    },
    imei: { //IMEI
        type: String
    },
    lastlogin_time: {
        type: String
    }
}, {
    versionKey: false
});


var mer_userModel = mongoose.model('mer_user', MerUsersSchema);
exports.mer_userModel = mer_userModel;
//用户列表

exports.mer_UserList = function (req, res) {
    mer_userModel.find(function (err, doc) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
        res.json(doc);
    });
};
//根据用户名查询用户信息
exports.userFindByName_Mer = function (req, res) {
    mer_userModel.findOne({
        nickname: req.query.nickname
    }, function (err, doc) {
        if (doc) {
            res.json(doc);
        }else{
            res.json({"data":"暂无数据！"});
        }
    });

};
//Login
exports.merLogin = function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
    mer_userModel.findOne({nickname: req.body.nickname}, function (e, o) {
        if (o) {
            if (o.password == req.body.password) {
                res.json({"success": true});
            }
        } else {
            res.json({"success": false});
        }
    });
}

//增加用户
exports.addMer_User = function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
    //获取当前时间
    var date = new Date();
    var time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();

    var user = new mer_userModel({
        nickname: req.body.nickname,
        password: req.body.password,
        address: '',
        tel: req.body.tel,
        alipay: req.body.alipay,
        headimgurl: '',
        sex: '',
        birthday: '',
        age: '',
        constellation: '', //星座
        signature: '', //个性签名
        work: '',
        createtime: time,
        yesterday_Profit: '',
        login_Status: '',
        imei: req.body.imei,
        lastlogin_time: time
    });
    mer_userModel.findOne({
        nickname: req.body.nickname
    }, function (err, doc) {
        if (doc == null) {
            //新增
            user.save(function (err, doc) {
                if (err) {
                    console.log('注册失败');
                    res.json({
                        success: false
                    });
                } else {
                    console.log('注册成功！');
                    res.json({
                        success: true
                    });
                }

            });
        } else {
            res.json({
                err_data: '用户已存在！'
            });
        }
    });

};
//修改用户信息
exports.merUserEdit = function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');


    delete req.body._id;
    var user = new mer_userModel({
        address: req.body.address,
        realname: req.body.realname,
        tel: req.body.tel,
        QQ: req.body.QQ
    });
    //下面判断信息是否需要更新
    var upUser = {};
    if (!!user.address) {
        upUser.address = user.address;
    }
    if (!!user.tel) {
        upUser.tel = user.tel;
    }
    if (!!user.sex) {
        upUser.sex = user.sex;
    }
    if (!!user.openid) {
        upUser.openid = user.openid;
    }
    if (!!user.realname) {
        upUser.realname = user.realname;
    }
    if (!!user.QQ) {
        upUser.QQ = user.QQ;
    }
    if (!!user.imgUrl) {
        upUser.imgUrl = user.imgUrl;
    }
    if (!!user.score) {
        upUser.score = user.score;
    }

    mer_userModel.update({
        openid: req.body.openid
    }, {
        $set: upUser
    }, {
        multi: true
    }, function (err, doc) {
        if (err) {
            res.jsonp({
                status: 2
            })
        } else {
            res.jsonp({
                status: 1
            })
        }

    });
};
//删除用户信息
exports.userDel = function (req, res) {
    mer_userModel.remove({
            openid: req.body.openid
        },
        function (err, doc) {
            res.header("Access-Control-Allow-Origin", "*");
            res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE,OPTIONS');
            res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.json({
                status: 1
            })
        });
};


//////////////
