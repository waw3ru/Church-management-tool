/*
	* small server to handle PCEA church services
	* Created by John Waweru 14th May 2015
*/

var http = require("http");
var express = require("express");
var path = require("path");
var body = require("body-parser");
var cookie = require("cookie-parser");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var crypto = require("crypto");

var app = express();

app.set("x-powered-by", false);
app.set("trust proxy");

app.use(body.json());
app.use(body.urlencoded({extended: false}));
app.use(cookie(crypto.randomBytes(64)));
app.use(express.static(path.join(__dirname, '../public')));

app.use(session({
    secret: crypto.randomBytes(72),
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
        url: 'mongodb://127.0.0.1:27017/pcea_nakuruwest_parish',
        touchAfter: 24 * 3600 // time period in seconds
    })
}));

// after http server setup start database connection
var dbConn = require("./db_conn");
dbConn("mongodb://127.0.0.1:27017/pcea_nakuruwest_parish");

// globally expose schemas
require("./schema");

// api routes
var routes = require("./routes");
app.use("/app", routes.app);
app.use("/api", routes.api);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({'message': err.message, 'error' : err});
    });

}

module.exports = app;