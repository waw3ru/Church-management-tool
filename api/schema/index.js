/**
 * Created by waweru on 5/12/2016.
 */


var mongoose = require('mongoose');

var models = {
    church: require("./members"),
    groups: require("./groups")
};

mongoose.model("congregation", models.church.congregations);
mongoose.model("members", models.church.members);
mongoose.model("districts", models.groups.districts);
mongoose.model("local_groups", models.groups.local_church_groups);
mongoose.model("local_group_members", models.groups.local_group_members);