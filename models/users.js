/**
 * Created by xueqingli on 14-9-15.
 * 用户中心
 */


var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    nickname: { //用户昵称
        type: String
    },
    password: { //密码
        type: String
    },
    address: { //用户住址
        type: String
    },
    tel: { //电话
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


var userModel = mongoose.model('user', UsersSchema);
exports.userModel = userModel;
//用户列表

exports.userList = function(req, res) {
    userModel.find(function(err, doc) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
        res.json(doc);
    });
};
//根据用户名查询用户信息
exports.userFindByName = function(req, res) {
    userModel.findOne({
        nickname: req.query.nickname
    }, function(err, doc) {
        if (doc) {
            res.json(doc);
        } else {
            res.json(err);
        }
    });

};

//Login
exports.userLogin = function(req, res) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');

    userModel.findOne({
        nickname: req.body.nickname
    }, function(e, o) {
        if (o) {
            if (o.password == req.body.password) {
                res.json({
                    "success": true
                });
            }
        } else {
            res.json({
                "success": false
            });
        }
    });
}
//增加用户
exports.addUser = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
    //获取当前时间
    var date = new Date();
    var time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();

    var user = new userModel({
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
    userModel.findOne({
        nickname: req.body.nickname
    }, function(err, doc) {
        if (doc == null) {
            //新增
            user.save(function(err, doc) {
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
            console.log('注册失败');
            res.json({
                success: false
            });
        }
    });

};
//修改用户信息
exports.userEdit = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');


//    delete req.body._id;
    var user = new userModel({
        nickname: req.body.nickname,
        password: req.body.password,
        tel: req.body.tel,
        alipay: req.body.alipay,
        headimgurl:req.body.headimgurl,
        sex:req.body.sex,
        birthday:req.body.birthday,
        age:req.body.age,
        constellation:req.body.constellation,
        signature:req.body.signature,
        work:req.body.work,
        address:req.body.address,
        lastlogin_time:req.body.lastlogin_time
    });
    //下面判断信息是否需要更新
    var upUser = {};
    if (!!user.nickname) {
        upUser.nickname = user.nickname;
    }
    if (!!user.tel) {
        upUser.tel = user.tel;
    }
    if (!!user.sex) {
        upUser.sex = user.sex;
    }
    if (!!user.password) {
        upUser.password = user.password;
    }
    if (!!user.alipay) {
        upUser.alipay = user.alipay;
    }
    if (!!user.headimgurl) {
        upUser.headimgurl = user.headimgurl;
    }
    if (!!user.birthday) {
        upUser.birthday = user.birthday;
    }
    if (!!user.age) {
        upUser.age = user.age;
    }
    if (!!user.constellation) {
        upUser.constellation = user.constellation;
    }
    if (!!user.signature) {
        upUser.signature = user.signature;
    }
    if (!!user.work) {
        upUser.work = user.work;
    }
    if (!!user.address) {
        upUser.address = user.address;
    }
    if(!!user.lastlogin_time){
        upUser.lastlogin_time=user.lastlogin_time;
    }


    userModel.update({
        _id: req.body._id
    }, {
        $set: upUser
    }, {
        multi: true
    }, function(err, doc) {
        if (err) {
            console.log('修改用户信息失败：'+err);
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
exports.userDel = function(req, res) {
    userModel.remove({
            openid: req.body.openid
        },
        function(err, doc) {
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