/**
 * Created by waweru on 5/13/2016.
 */

var mongoose = require("mongoose");
var districts = mongoose.model("districts");


var Model = (function () {

    return {
        add: function (data, done) {
            new districts(data)
                .save(function (err, results) {

                    if (err) {
                       return done(err, null);
                    }

                    return done(null, results);

                });

        },
        getAll: function (done) {

            districts
                .find({ disabled: false })
                .populate("congregation")
                .sort({ timestamp: -1 })
                .exec(function (err, results) {

                    if (err) {
                       return done(err, null);
                    }

                    return done(null, results);
                });
        },
        getOne: function (id, done) {

            districts
                .findOne({ _id: id, disabled: false })
                .populate("congregation")
                .exec(function (err, results) {

                    if (err) {
                        return done(err, null);
                    }

                    return done(null, results);
                });
        },
        update: function (id, changes, done) {

            districts
                .findByIdAndUpdate(id, changes)
                .exec(function (err, results) {

                    if (err) {
                        return done(err, null);
                    }

                    return done(null, results);
                });
        },
        remove: function (id, done) {

            districts
                .findByIdAndUpdate(id, { disabled: true })
                .exec(function (err, results) {

                    if (err) {
                        return done(err, null);
                    }

                    return done(null, results);
                });
        }
    }

})();


module.exports = Model;