/*
	delete district from mongo
*/

var mongoose = require("mongoose");
var District = mongoose.model("elder_districts");

var express = require("express");
var router = express.Router();


function delete_district(req, res) {

	District.remove({_id: req.query._id}, function (err) {
		if (!err) {
			res.json({msg: "District Removed!"});
		}
	});

}

router.get("/", delete_district);

module.exports = router;