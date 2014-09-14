var path = require('path');
var pkg = require('./package.json');

var config = {
  debug: true,
  name: 'qianduo-webservice',
  description: 'qianduo',
  version: pkg.version,

  upload_dir: path.join(__dirname, 'public', 'user_data'),

  db: 'mongodb://58.59.21.243/qianduo-server',
  db_name: 'qianduo-server',
  session_secret: 'wechat-qianduo-secret',
  auth_cookie_name: 'wechat-qianduo-auth-cookie',
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