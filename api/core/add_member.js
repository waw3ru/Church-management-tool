/*
	adds a church member to the database
*/

var mongoose = require("mongoose");
var Members = mongoose.model("church_members");

var express = require("express");
var router = express.Router();


function add(req, res) {

	member = new Members(req.body);

	member.save(function (err) {

		if (err) {
			res.json({error: true, error_msg: err});
		} else {
			res.json({msg: "Member added to database. :)"})
		}
	});
}

router.post("/", add);

module.exports = router;