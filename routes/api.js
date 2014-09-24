/**
 * Created by xueqingli on 14-9-15.
 */
var Users = require('../models/users.js');
var mer_Users = require('../models/merchant.js');
var mer_Ads=require('../models/mer_Ads.js');
var tops_Ads=require('../models/tops_ad.js');
var forward_User=require('../models/forward_user.js');

module.exports = function (app) {

    //注册用户
    app.post('/api/register', Users.addUser);
    //注册商户
    app.post('/api/register_Mer', mer_Users.addMer_User);
    //完善用户信息
    app.post('/api/userEdit', Users.userEdit);
    //完善商户信息
    app.post('/api/userEdit_Mer', mer_Users.merUserEdit);
    //用户列表
    app.get('/api/userList', Users.userList);
    //商户列表
    app.get('/api/userList_Mer', mer_Users.mer_UserList);
    //用户登陆
    app.post('/api/userLogin', Users.userLogin);
    //商户登陆
    app.post('/api/merLogin', mer_Users.merLogin);

    //根据用户名得到用户详细信息
    app.get('/api/userFindByName', Users.userFindByName);
    //我的订单
    app.get('/api/userFindByName_Mer', mer_Users.userFindByName_Mer);

    //广告列表
    app.get('/api/mer_AdsList',mer_Ads.adsList);
    //上传广告
    app.post('/api/addAds',mer_Ads.addAds);
    //根据商户名字查询广告信息
    app.get('/api/adsFindByName',mer_Ads.adsFindByName);

    //顶部广告列表
    app.get('/api/adsTopList',tops_Ads.adsTopList);
    //上传顶部广告
    app.post('/api/addTopAds',tops_Ads.addTopAds);

    //转发人列表
    app.get('/api/forwardUserList',forward_User.forwardUserList);
    //存储转发人
    app.post('/api/addForwardUsers',forward_User.addForwardUsers);
    //根据广告id 查询转发人列表
    app.get('/api/forwardListByAdsID',forward_User.forwardListByAdsID);

    //版本更新检测
    app.get('/api/update',function(req,res){
        res.json({
            "path":"121.42.28.206:3000/qianduo.apk",
            "version":"1"
        });
    });

}