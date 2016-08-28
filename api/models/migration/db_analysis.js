/**
 * Created by waweru on 6/3/2016.
 */


var mongoose = require("mongoose");

// schemas

require("./../core/db/models");
var church_members = mongoose.model("church_members");
var elder_districts = mongoose.model("elder_districts");


mongoose.connect("mongodb://127.0.0.1:27017/pcea_nakuruwest_parish");

mongoose.connection
    .on("error", function (err) {
        console.log("Error while connecting: \n" + err);
    })
    .on('open', function () {

        console.log("Connected to mongodb server");

        /*mongoose
            .connection
            .db
            .listCollections().toArray(function (err, names) {
                console.log(err);
                console.log(names); // [{ name: 'dbname.myCollection' }]
            });*/

    });



