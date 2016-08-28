/*
	performs a connection to mongo db
*/

var mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/pcea_nakuruwest_parish");

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