var app = angular.module("pcea_nakuruwest_parish", ["ngRoute"]);

app.config(["$routeProvider", function ($routeProvider) {

	$routeProvider

		.when("/", {
			templateUrl: "/members_page",
			controller: "MembersController as membersctrl"
		})
		.when("/addMembers", {
			templateUrl: "/add_members",
			controller: "AddController as addctrl"
		})
		.when("/addDistricts", {
			templateUrl: "/add_district",
			controller: "DistrictController as districtctrl"
		})
		.when("/update_member/:id", {
			templateUrl: "/update_member",
			controller: "UpdateController as updatectrl"
		})
		.otherwise({redirectTo: "/"});
}]);