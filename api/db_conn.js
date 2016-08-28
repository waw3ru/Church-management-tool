/**
 * Created by waweru on 5/12/2016.
 */


var mongoose = require("mongoose");


module.exports = function (db_url) {

    mongoose.connect(db_url);

    mongoose.connection.on("connected", function () {
        console.log("Connected to mongodb server");
    });

    mongoose.connection.on("error", function (err) {
        console.log("Error while connecting: \n" + err);
    });

    mongoose.connection.on("disconnected", function () {
        console.log("Disconnected from mongodb server");
    });

    /* close connection to database when app terminates */
    process.on('SIGINT', function() {
        mongoose.connection.close(function () {
            console.log('disconnected from mongodb server through app termination');
            process.exit(0);
        });
    });

}


