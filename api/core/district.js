/*
	gets the districts from mongo
*/

var mongoose = require("mongoose");
var District = mongoose.model("elder_districts");

var express = require("express");
var router = express.Router();

function districts(req, res) {

	District.find()
		.exec( function (err, district) {

			if (err) {
				res.json({error: true, error_msg: err});
			} else {
				res.json(district);
			}

		} );
}

router.get("/", districts);

module.exports = router;
