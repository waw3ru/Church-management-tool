app.controller("DistrictController", ["$http", function ($http) {

	var self = this;

	self.add = function () {

		$http.post("/add_district", self.data)
			.then(function (response) {

				if (response.data.error) {
					self.alert = {type: "danger", msg: response.data.error_msg};
				} else {
					self.alert = {type: "info", msg: response.data.msg};
					self.data = {};
				}

			});
	};


	$http.get("/district")
		.then(function (response) {

			if (response.data.error) {
				self.alert = {type: "danger", msg: response.data.error_msg};
			} else {
				self.districts = response.data;
				self.number = self.districts.length;
			}

		});

	self.delete_district = function (_id) {

		$http.get("/delete_district?_id="+_id)
			.then(function (response) {
				self.alert = {type: "warning", msg: response.data.msg};
				window.location.reload();
			});

	};

}]);



app.controller("AddController", ["$http", function ($http) {

	var self = this;

	$http.get("/district")
		.then(function (response) {

			if (response.data.error) {
				self.alert = {type: "danger", msg: response.data.error_msg};
			} else {
				self.districts = response.data;
			}

		});


	self.data = {};

	self.data.children = [];

	self.add = function () {
		
		$http.post("/add_member", self.data)
			.then(function (response) {

				if (response.data.error) {
					self.alert = {type: "danger", msg: response.data.error_msg};
				} else {
					self.alert = {type: "success", msg: response.data.msg};

					window.location.reload();
				}
			});

	};

}]);


app.controller("MembersController", ["$http", "$location", function ($http, $location) {

	var self=this;

	self.fields = {
		member_id: true,congregation: true,firstname: true,middlename: true,lastname: true,telephone: true,
		gender: true,age_bracket: true,marital_status: true,membership_duration: true,district: true,full_member: true
	};

	$http.get("/district")
		.then(function (response) {

			if (response.data.error) {
				self.alert = {type: "danger", msg: response.data.error_msg};
			} else {
				self.districts = response.data;
			}

		});

  self.data = {};

	self.get = function () {

		$http.post("/member", self.data)
			.then(function (response) {

				if (response.data.error) {
					self.alert = {type: "danger", msg: response.data.error_msg};
				} else {

					self.members = response.data;
					self.number = self.members.length;
				}

			});

		self.data = {};

	};

}]);

app.controller("UpdateController", ["$http", "$routeParams", "$location", function ($http, $routeParams, $location) {

	var self = this;

	$http.get("/district")
		.then(function (response) {

			if (response.data.error) {
				self.alert = {type: "danger", msg: response.data.error_msg};
			} else {
				self.districts = response.data;
			}

		});

	self.data = {};

	self.update = function () {

		$http.post("/update?_id="+ $routeParams.id, self.data)
			.then( function (response) {

				if (response.data.error) {
					self.alert = {type: "danger", msg: response.data.error_msg};
				} else {
					$location.path("/");
				}

			} );

	};

}]);