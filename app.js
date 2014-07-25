/**
 * Created by jeremy on 14-7-25.
 */

var path = require('path');
var express = require('express');
var session = require('express-session');
var errorhandler = require('errorhandler');
var MongoStore = require('connect-mongo')(session);
var compress = require('compression');
var config = require('./config');
//var routes = require('./routes');

var maxAge = 3600000 * 24 * 30;
var staticDir = path.join(__dirname, 'public');

var app = express();

app.use(require('cookie-parser')(config.session_secret));
app.use(require('response-time')());
app.use(require('body-parser')());
app.use(require('method-override')());
app.use(session({
  secret: config.session_secret,
  key: 'sid',
  store: new MongoStore({
    db: config.db_name
  })
}));
app.use(compress());

// configuration in all env
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs-locals'));

app.use('/public', express.static(staticDir));
app.use(errorhandler({ dumpExceptions: true, showStack: true }));
if (!config.debug) {
  app.set('view cache', true);
}

// routes
//routes(app);

app.listen(config.port, function (argument) {
  console.log("wechat-webserver listening on port %d in %s mode", config.port, app.settings.env);
});

module.exports = app;