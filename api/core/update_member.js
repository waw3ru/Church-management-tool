/*
	 helps update member information
*/

var mongoose = require("mongoose");
var members = mongoose.model("church_members");

var express = require("express");
var router = express.Router();

router.post("/", function (req, res) {

	members.update({_id:req.query._id}, {$set: req.body}, function (err) {
		if (err) {
			res.json({error: true, error_msg: err});
		} else {
			res.json({msg: "success"});
		}
		
	});

});

module.exports = router;

