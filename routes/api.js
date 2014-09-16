/**
 * Created by xueqingli on 14-9-15.
 */
var Users = require('../models/users.js');
var mer_Users = require('../models/merchant.js');


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
//    //删除订单
//    app.get('/weixin/delOrder', Appoint.delOrder);
//    //处理订单状态
//    app.get('/weixin/updateAppointSucced', Appoint.updateAppointSucced);
//    //得到相册列表
//    app.get('/weixin/getAlbumTypeList', albumType.getAlbumTypeList);
//    //删除一个相册
//    app.get('/weixin/delAlbumTypeList', albumType.delAlbumTypeList);
//    //根据相册id得到相册图片列表
//    app.get('/weixin/getAlbumListByImgType', albumList.getAlbumListByImgType);
//    //根据id删除一张图片
//    app.get('/weixin/delAlbumListByImgType', albumList.delAlbumListByImgType);


}