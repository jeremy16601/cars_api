/**
 * Created by jeremy on 14-7-25.
 */
/**
 * Created by jeremy on 14-7-17.
 */

var express = require('express');
//var routes = require('./routes');

var api = require('./routes/api.js');
var http = require('http');
var path = require('path'),
    MongoStore = require('connect-mongo')(express),
    config = require('./config'),
    flash = require('connect-flash');
var mongoose = require('./db').mongoose;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log('db连接！！');
});

var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(flash());
app.use(express.logger('dev'));
app.use(express.bodyParser({
    uploadDir: './uploads'
}));
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
    secret: config.cookieSecret,
    proxy: true,
    key: config.db,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30
    }, //30 days
    store: new MongoStore({
        db: config.db
    })
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);
app.use(express.query());

if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
app.enable('trust proxy');

//var server = http.createServer(app);
//server.listen(app.get('port'), function () {
//});
api(app);
//routes(app);

app.listen(process.env.PORT || 3000);