/**
 * Created by waweru on 5/12/2016.
 */

var mongoose = require('mongoose');

module.exports ={
    members: {
        member_id: {type: String, required: true, unique: true},
        congregation: { type: mongoose.Schema.Types.ObjectId, ref: "congregation" },
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
        district: { type: mongoose.Schema.Types.ObjectId, ref: "districts" },
        full_member_state: {type: Boolean},
        full_member_reason: {type: String},
        timestamp: { type: Date, default: new Date() },
        disabled: { type: Boolean, default: false }
    },
    congregations: {
        name: { type: String, required: true, unique: true },
        location: { type: String, required: true, unique: false},
        timestamp: { type: Date, default: new Date() },
        disabled: { type: Boolean, default: false }
    }
};