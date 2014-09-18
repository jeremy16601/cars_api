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
    realname: { // 真实姓名
        type: String
    },
    qq: { //用户年龄
        type: String
    },
    signature: { //个性签名
        type: String
    },
    address: { //商户地址
        type: String
    },
    createtime: { //入驻平台的时间
        type: String
    },
    login_Status: { //商户登录状态
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
        } else {
            res.json({"data": "暂无数据！"});
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
        realname: '',
        qq: '',
        signature: '', //个性签名
        work: '',
        createtime: time,
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


//    delete req.body._id;
    var user = new mer_userModel({
        nickname: req.body.nickname,
        address: req.body.address,
        tel: req.body.tel,
        alipay: req.body.alipay,
        headimgurl: req.body.headimgurl,
        realname: req.body.realname,
        qq: req.body.qq,
        signature: req.body.signature, //个性签名
        login_Status: req.body.login_Status,
        lastlogin_time: req.body.lastlogin_time

    });
    //下面判断信息是否需要更新
    var upUser = {};
    if (!!user.nickname) {
        upUser.nickname = user.nickname;
    }
    if (!!user.tel) {
        upUser.tel = user.tel;
    }
    if (!!user.qq) {
        upUser.qq = user.qq;
    }
    if (!!user.alipay) {
        upUser.alipay = user.alipay;
    }
    if (!!user.headimgurl) {
        upUser.headimgurl = user.headimgurl;
    }
    if (!!user.realname) {
        upUser.realname = user.realname;
    }
    if (!!user.signature) {
        upUser.signature = user.signature;
    }
    if (!!user.login_Status) {
        upUser.login_Status = user.login_Status;
    }
    if (!!user.lastlogin_time) {
        upUser.lastlogin_time = user.lastlogin_time;
    }

    mer_userModel.update({
        _id: req.body._id
    }, {
        $set: upUser
    }, {
        multi: true
    }, function (err, doc) {
        if (err) {
            console.log('修改用户信息失败：' + err);
            res.json({
                success: false
            })
        } else {
            res.json({
                success: true
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
