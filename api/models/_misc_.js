/**
 * Created by waweru on 5/13/2016.
 */


var mongoose = require("mongoose");
require("./../db_conn")("mongodb://127.0.0.1:27017/pcea_nakuruwest_parish");
require("./../core/db/models"); // old models and schema
require("./../schema"); // the new improved schema


var compilation = {
    oldDistrictsData: mongoose.model("elder_districts"),
    oldMembersData: mongoose.model("church_members"),
    newData: {
        members: mongoose.model("members"),
        districts: mongoose.model("districts"),
        local_groups: mongoose.model("local_groups"),
        local_group_members: mongoose.model("local_group_members"),
        congregation: mongoose.model("congregation")
    }
};

module.exports = compilation;