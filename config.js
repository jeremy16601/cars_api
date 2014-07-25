var path = require('path');
var pkg = require('./package.json');

var config = {
  debug: true,
  name: 'wechat-webservice',
  description: '基于wechat[https://github.com/node-webot/wechat]的web后台管理项目',
  version: pkg.version,

  upload_dir: path.join(__dirname, 'public', 'user_data'),

  db: 'mongodb://localhost/wechat-server',
  db_name: 'wechat-server',
  session_secret: 'wechat-server-secret',
  auth_cookie_name: 'wechat-server-auth-cookie',
  port: 3001,

  mail_opts: {
    service: "",
    auth: {
      user: "",
      pass: ""
    }
  }
};

module.exports = config;