/*
* created by waweru
*/


(function () {

	angular
		.module("pcea")
		.config(appConfig);


	appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

	function appConfig($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise("/");
		$urlRouterProvider.when("/platform", "/platform/dashboard");

		$stateProvider
			.state("Login", {
				url: "/",
				controller: "LoginCtrl as loginCtrl",
				templateUrl: "/app/login.html"
			})	
			.state("Platform", {
				url: "/platform",
				abstract: true,
				templateUrl: "/app/platform.html",
				controller: "PlatformCtrl as platformCtrl"
			})
			.state("Dashboard", {
				url: "/dashboard",
				parent: "Platform",
				templateUrl: "/app/dashboard.html",
				controller: "DashCtrl as dashCtrl"
			})
			.state("Members", {
				url: "/members",
				parent: "Platform",
				templateUrl: "/app/members.html",
				controller: "MembersCtrl as membersCtrl"
			})
			.state("Groups", {
				url: "/groups",
				parent: "Platform",
				templateUrl: "/app/groups.html",
				controller: "GroupsCtrl as groupsCtrl"
			})
			.state("Districts", {
				url: "/districts",
				parent: "Platform",
				templateUrl: "/app/districts.html",
				controller: "DistrictsCtrl as districtsCtrl"
			});


	}


})();