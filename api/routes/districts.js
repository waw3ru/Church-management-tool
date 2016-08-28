/**
 * Created by waweru on 5/13/2016.
 */


var express = require("express");
var router = express.Router();
var DistrictsModel = require('./../models/districts');

var Routes = (function () {

    return {
        create: function (req, res) {
            DistrictsModel
                .add(req.body, function (err, data) {

                    if (err) {
                        res.json(err);
                    } else {
                        res.json(data);
                    }

                });
        },
        readAll: function (req, res) {
            DistrictsModel
                .getAll(function (err, data) {

                    if (err) {
                        res.json(err);
                    } else {
                        res.json(data);
                    }

                });
        },
        readOne: function (req, res) {
            DistrictsModel
                .getOne(req.params.id, function (err, data) {

                    if (err) {
                        res.json(err);
                    } else {
                        res.json(data);
                    }

                });
        },
        update: function (req, res) {
            DistrictsModel
                .update(req.params.id, req.body, function (err, data) {

                    if (err) {
                        res.json(err);
                    } else {
                        res.json(data);
                    }

                });
        },
        remove: function (req, res) {
            DistrictsModel
                .remove(req.params.id, function (err, data) {

                    if (err) {
                        res.json(err);
                    } else {
                        res.json(data);
                    }

                });
        }
    }

})();


router.post("/", Routes.create);
router.get("/", Routes.readAll);
router.get("/:id", Routes.readOne);
router.put("/:id", Routes.update);
router.delete("/:id", Routes.remove);

module.exports = router;