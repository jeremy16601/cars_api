var mongoose = require('mongoose');

var uriUtil = require('mongodb-uri');


var options = {
    server: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 10000
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 10000
        }
    }
};


var mongodbUri = 'mongodb://114.215.134.174/cars_webapp';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose
    .connect(mongooseUri, options);

exports.mongoose = mongoose;
