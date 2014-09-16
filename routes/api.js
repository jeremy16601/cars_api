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
//    //提交预约
//    app.post('/weixin/addAppoint', Appoint.addAppointment);
//    //预约列表
//    app.get('/weixin/getAppointList', Appoint.getAppointList);
//    //我的订单
//    app.get('/weixin/myOrders', Appoint.getMyOrders);
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


    //提交预约
    // app.post('/appoint-api', function(req, res) {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
    //     var appointment = {};
    //     appointment.app_Type = req.body.app_Type; //预定类型
    //     appointment.appointmentText = req.body.appointmentText; //post发送的问题内容
    //     appointment.appointmentName = req.body.appointmentName;
    //     appointment.appointmentTel = req.body.appointmentTel;
    //     appointment.answer = []; //先设置一个空数组，这个数组以后push问题的回答
    //     appointment.name = req.body.name; //提问者的名字
    //     //调用addAppointment函数，存入用户预约
    //     User.addAppointment(appointment, function(err, doc) {
    //         if (err) {
    //             req.flash('error', err);
    //             res.json({
    //                 "status": 0
    //             });
    //             return res.redirect('/');
    //         }
    //         //如果成功存入，返回{"status": 1}给客户端
    //         res.json({
    //             "status": 1
    //         });
    //     })
    // });


}