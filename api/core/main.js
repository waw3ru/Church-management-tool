/*
	the middleware file for routes
*/


var add_district = require("./add_district");
var districts = require("./district");
var delete_district = require("./del_district");
var add_member = require("./add_member");
var members = require("./members");
var update_member = require("./update_member");

var app = function (app) {

	app.get("/", function (req,res) {
    res.render("main", {title: "PCEA nakuruwest parish"});
  });
  app.get("/members_page", function (req,res) {
    res.render("members");
  });
  app.get("/add_members", function (req,res) {
    res.render("add_member");
  });
  app.get("/add_district", function (req,res) {
    res.render("add_district");
  });
  app.get("/update_member", function (req, res) {
    res.render("update_member");
  });

  app.use("/add_district", add_district);
  app.use("/district", districts);
  app.use("/delete_district", delete_district);
  app.use("/add_member", add_member);
  app.use("/member", members);
  app.use("/update", update_member);




/*
 * Handle errors for 404 'page not found'
*/

  app.use(function (req, res) {
    // catch all 404 errors
    var err = new Error('not found');
    err.status = 404;

    res.send("<h1>404 error!</h1><br />This page does not exist...<br /><a href='/'>Go to homepage</a>");

  });



/*
 * handling all server errors
*/

// development error handler will print stacktrace

  if (app.get('env') === 'development') {

    app.use(function (err, req, res, next) {

      console.log('\n' + err);

      res.status(err.status || 500);
      res.send('<h1>Error: </h1><br />'+err);
    });
  }


// production error handler no stacktraces leaked to user

  app.use(function (err, req, res, next) {

  	// console.log('\n' + err);

    res.status(err.status || 500);

    res.send("<h1>Error experienced!</h1><br />Sorry for this! contact the engineer to fix it<br /><a href='/'>Go to homepage</a>");

  });

};

module.exports = app;

