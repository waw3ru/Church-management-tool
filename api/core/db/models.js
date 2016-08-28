/*
	holds the schemas for the application
*/

var mongoose = require("mongoose");

var memberSchema = new mongoose.Schema({
	member_id: {type: String, required: true, unique: true},
	congregation: {type: String, required: true},
	firstname: {type: String, required: true},
	middlename: {type: String},
	lastname: {type: String, required: true},
	email: {type: String},
	telephone: {type: String},
	id_number: {type: String},
	gender: {type: String},
	age_bracket: {type: String},
	marital_status: {type: String},
	spouse_name: {type: String},
	membership_duration: {type: String},
	profession: {type: String},
	district: {type: mongoose.Schema.Types.ObjectId, ref: "elder_districts"},
	full_member_state: {type: Boolean},
	full_member_reason: {type: String},
	num_children: {type: Number},
	groups_active: {type: String},
	church_group: {type: String},
	join: {type: String}
});

var districtSchema = new mongoose.Schema({
	name: {type: String, required: true},
	church: {type: String}
});


mongoose.model("church_members", memberSchema);
mongoose.model("elder_districts", districtSchema);