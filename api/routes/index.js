/**
 * Created by waweru on 5/12/2016.
 */


var express = require('express');
var path = require("path");
var app = express.Router(),
    api = express.Router();

var congregation = require("./congregation");
var districts = require("./districts");

app.get('/:page', function (req, res) {
    var page_name = path.join(__dirname, "../../public/templates/" + req.params.page);
    res.sendFile(page_name);
});


/* congregation api routes */
api.use("/congregation", congregation);
api.use("/districts", districts);




module.exports = {
    app: app,
    api: api
};