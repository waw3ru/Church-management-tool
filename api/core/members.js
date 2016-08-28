/*
	get all members
*/

var mongoose = require("mongoose");
var Members = mongoose.model("church_members");

var express = require("express");
var router = express.Router();

function get(req, res) {

/*	if (req.body.district) {
		var district = {ObjectId: req.body.district};
	}*/

	Members.find(req.body)
		.populate("district")
		.exec( function (err, data) {

			if (err) {
				res.json({error: true, error_msg: err});
			} else {
				res.json(data);
			}
		} );

}

router.post("/", get);

module.exports = router;