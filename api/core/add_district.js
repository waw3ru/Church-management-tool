/*
	adds district to mongo
*/

var mongoose = require("mongoose");
var District = mongoose.model("elder_districts");

var express = require("express");
var router = express.Router();

function add(req, res) {

	newDistrict = new District({
		name: req.body.name,
		church: req.body.church
	});

	newDistrict.save( function (err, district) {

		if (err) {
			res.json({error: true, error_msg: err});
		} else {
			res.json({error: false, msg: "District Successfully added"});
		}

	} );
}


router.post("/", add);

module.exports = router;