/**
 * Created by waweru on 5/12/2016.
 */


var mongoose = require("mongoose");

module.exports = {

    districts: {
        name: {
            type: String,
            required: [true, "district name required"],
            unique: [true, "district with same name exist"]
        },
        elder: {
            type: String,
            required: [true, "Elder already exist"]
        },
        phone_number: {
            type: String,
            required: false,
            unique: [true, "Phone number already exist"]
        },
        congregation: {
            type: mongoose.Schema.Types.ObjectId, ref: "congregation",
            required: [true, "Must specify church"]
        },
        timestamp: { type: Date, default: new Date() },
        disabled: { type: Boolean, default: false }
    },
    local_church_groups: {
        name: {
            type: String,
            required: [true, "district name required"],
            unique: [true, "district with same name exist"]
        },
        leader: {
            type: String,
            required: false
        },
        phone_number: {
            type: String,
            required: [true, "phone number is required"],
            unique: [true, "Phone number already exist"]
        },
        timestamp: { type: Date, default: new Date() }
    },
    local_group_members: {
        group: {
            type: mongoose.Schema.Types.ObjectId, ref: "local_groups",
            required: true
        },
        member: {
            type: mongoose.Schema.Types.ObjectId, ref: "members",
            required: true
        }
    }
};