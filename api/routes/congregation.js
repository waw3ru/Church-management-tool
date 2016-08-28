/**
 * Created by waweru on 5/12/2016.
 */

var express = require("express");
var router = express.Router();

var CongregationModel = require('./../models/congregation');
var Routes = (function () {

    return {
        create: function (req, res) {
            CongregationModel
                .add(req.body,
                    function (err, data) {

                        if (err) {
                            res.status(500);
                            res.json(err);
                        } else {
                            res.json(data);
                        }

                    });
        },
        readAll: function (req, res) {
            CongregationModel
                .getAll(function (err, data) {

                        if (err) {
                            res.status(500);
                            res.json(err);
                        } else {
                            res.json(data);
                        }

                    });
        },
        readOne: function (req, res) {
            CongregationModel
                .getOne(req.params.id,
                    function (err, data) {

                        if (err) {
                            res.status(500);
                            res.json(err);
                        } else {
                            res.json(data);
                        }

                    });
        },
        update: function (req, res) {

            CongregationModel
                .update(req.params.id,
                    req.body,
                    function (err, data) {

                        if (err) {
                            res.status(500);
                            res.json(err);
                        } else {
                            res.json(data);
                        }

                    });
        },
        remove: function (req, res) {
            CongregationModel
                .remove(req.params.id,
                    function (err, data) {

                        if (err) {
                            res.status(500);
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