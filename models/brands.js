/**
 * 汽车品牌
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    name: { //用户昵称
        type: String
    }
}, {
    versionKey: false
});


var brandsModel = mongoose.model('brands', UsersSchema);
exports.brandsModel = brandsModel;
//用户列表
exports.brandsList = function (req, res) {
    brandsModel.find(function (err, doc) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
        res.json(doc);
    });
};

//根据id查询品牌信息
exports.brandsFindByName = function (req, res) {
    brandsModel.findOne({
        nickname: req.query.nickname
    }, function (err, doc) {
        if (doc) {
            res.json(doc);
        } else {
            res.json(err);
        }
    });

};

//增加用户
exports.addBrands = function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');

    var brand = new brandsModel({
        name: req.body.name
    });
    brandsModel.findOne({
        name: req.body.name
    }, function (err, doc) {
        if (doc == null) {
            //新增
            brand.save(function (err, doc) {
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
//修改用户信息
exports.userEdit = function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');


//    delete req.body._id;
    var user = new brandsModel({
        nickname: req.body.nickname,
        password: req.body.password,
        tel: req.body.tel,
        alipay: req.body.alipay,
        headimgurl: req.body.headimgurl,
        sex: req.body.sex,
        birthday: req.body.birthday,
        age: req.body.age,
        constellation: req.body.constellation,
        signature: req.body.signature,
        work: req.body.work,
        address: req.body.address,
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
    if (!!user.lastlogin_time) {
        upUser.lastlogin_time = user.lastlogin_time;
    }


    brandsModel.update({
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
    brandsModel.remove({
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