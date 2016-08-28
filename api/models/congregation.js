/**
 * Created by waweru on 5/12/2016.
 */

var mongoose = require("mongoose");
var congregation = mongoose.model("congregation");

var Model = (function () {

    return {

        add: function (data, done) {

            new congregation(data)
                .save(function (err, results) {

                    if(err) {
                        return done(err, null);
                    }

                    return done(null, results);
                });

        },
        getAll: function (done) {
            congregation
                .find({ disabled: false })
                .exec(function (err, results) {
                    if (err) {
                        done(err, null);
                    }

                    done(null, results);
                });

        },
        getOne: function (id, done) {
            congregation
                .findOne({ _id: id , disabled: false })
                .exec(function (err, result) {
                    if (err) {
                        done(err, null);
                    }

                    done(null, result);
                });
        },
        update: function (id, changes, done) {
            congregation
                .findByIdAndUpdate(id, changes)
                .exec(function (err, result) {
                    if (err) {
                        done(err, null);
                    }

                    done(null, result);
                });
        },
        remove: function (id, done) {
            congregation
                .findByIdAndUpdate(id, { disabled: true })
                .exec(function (err, result) {
                    if (err) {
                        done(err, null);
                    }

                    done(null, result);
                });
        }
    }

})();

module.exports = Model;