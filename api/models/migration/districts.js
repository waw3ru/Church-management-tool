/**
 * Created by waweru on 5/13/2016.
 */

var mongoose = require("mongoose");
var misc = require("./../_misc_");
var crypto = require("crypto");

misc
    .oldDistrictsData
    .find({})
    .exec(function (err, data) {

        if (err) {
            console.log(err);
            process.exit(0);
        }

        data.forEach(function (obj, index, arr) {

            var name = (obj.church === "Surburb") ? "PCEA Nakuru West Church" : "PCEA Mwangaza";

            misc
                .newData
                .congregation
                .findOne({ name: name })
                .exec(function (err, result) {

                    if (err) {
                        console.log(err);
                        process.exit(0);
                    }

                    new misc
                        .newData
                        .districts({
                            name: obj.name,
                            congregation: mongoose.Types.ObjectId(result._id),
                            phone_number: crypto.randomBytes(7).toString('hex'),
                            elder: crypto.randomBytes(7).toString('hex')
                        })
                        .save(function (err) {
                            if (err) {
                                console.log(err);
                                process.exit(0);
                            }

                            console.log(obj.name + " saved!")
                        });

                });

        });

    });