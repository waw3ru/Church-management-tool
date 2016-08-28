/*
* created by waweru
*/



(function () {

	angular
		.module("pcea", 
		[
			"ui.router",
            "ui.bootstrap",
			"ngResource",
            "ngAnimate",
            "ngTouch",
            "angular-loading-bar",
            "ngMessages",
            "LocalStorageModule",
			"ui-notification"
		])
		.run(appRun);

	appRun.$inject = [];

	function appRun() {
		

	}

})();

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbmZpZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogY3JlYXRlZCBieSB3YXdlcnVcclxuKi9cclxuXHJcblxyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuXHJcblx0YW5ndWxhclxyXG5cdFx0Lm1vZHVsZShcInBjZWFcIiwgXHJcblx0XHRbXHJcblx0XHRcdFwidWkucm91dGVyXCIsXHJcbiAgICAgICAgICAgIFwidWkuYm9vdHN0cmFwXCIsXHJcblx0XHRcdFwibmdSZXNvdXJjZVwiLFxyXG4gICAgICAgICAgICBcIm5nQW5pbWF0ZVwiLFxyXG4gICAgICAgICAgICBcIm5nVG91Y2hcIixcclxuICAgICAgICAgICAgXCJhbmd1bGFyLWxvYWRpbmctYmFyXCIsXHJcbiAgICAgICAgICAgIFwibmdNZXNzYWdlc1wiLFxyXG4gICAgICAgICAgICBcIkxvY2FsU3RvcmFnZU1vZHVsZVwiLFxyXG5cdFx0XHRcInVpLW5vdGlmaWNhdGlvblwiXHJcblx0XHRdKVxyXG5cdFx0LnJ1bihhcHBSdW4pO1xyXG5cclxuXHRhcHBSdW4uJGluamVjdCA9IFtdO1xyXG5cclxuXHRmdW5jdGlvbiBhcHBSdW4oKSB7XHJcblx0XHRcclxuXHJcblx0fVxyXG5cclxufSkoKTtcclxuIiwiLypcclxuKiBjcmVhdGVkIGJ5IHdhd2VydVxyXG4qL1xyXG5cclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcblxyXG5cdGFuZ3VsYXJcclxuXHRcdC5tb2R1bGUoXCJwY2VhXCIpXHJcblx0XHQuY29uZmlnKGFwcENvbmZpZyk7XHJcblxyXG5cclxuXHRhcHBDb25maWcuJGluamVjdCA9IFsnJHN0YXRlUHJvdmlkZXInLCAnJHVybFJvdXRlclByb3ZpZGVyJ107XHJcblxyXG5cdGZ1bmN0aW9uIGFwcENvbmZpZygkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XHJcblxyXG5cdFx0JHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShcIi9cIik7XHJcblx0XHQkdXJsUm91dGVyUHJvdmlkZXIud2hlbihcIi9wbGF0Zm9ybVwiLCBcIi9wbGF0Zm9ybS9kYXNoYm9hcmRcIik7XHJcblxyXG5cdFx0JHN0YXRlUHJvdmlkZXJcclxuXHRcdFx0LnN0YXRlKFwiTG9naW5cIiwge1xyXG5cdFx0XHRcdHVybDogXCIvXCIsXHJcblx0XHRcdFx0Y29udHJvbGxlcjogXCJMb2dpbkN0cmwgYXMgbG9naW5DdHJsXCIsXHJcblx0XHRcdFx0dGVtcGxhdGVVcmw6IFwiL2FwcC9sb2dpbi5odG1sXCJcclxuXHRcdFx0fSlcdFxyXG5cdFx0XHQuc3RhdGUoXCJQbGF0Zm9ybVwiLCB7XHJcblx0XHRcdFx0dXJsOiBcIi9wbGF0Zm9ybVwiLFxyXG5cdFx0XHRcdGFic3RyYWN0OiB0cnVlLFxyXG5cdFx0XHRcdHRlbXBsYXRlVXJsOiBcIi9hcHAvcGxhdGZvcm0uaHRtbFwiLFxyXG5cdFx0XHRcdGNvbnRyb2xsZXI6IFwiUGxhdGZvcm1DdHJsIGFzIHBsYXRmb3JtQ3RybFwiXHJcblx0XHRcdH0pXHJcblx0XHRcdC5zdGF0ZShcIkRhc2hib2FyZFwiLCB7XHJcblx0XHRcdFx0dXJsOiBcIi9kYXNoYm9hcmRcIixcclxuXHRcdFx0XHRwYXJlbnQ6IFwiUGxhdGZvcm1cIixcclxuXHRcdFx0XHR0ZW1wbGF0ZVVybDogXCIvYXBwL2Rhc2hib2FyZC5odG1sXCIsXHJcblx0XHRcdFx0Y29udHJvbGxlcjogXCJEYXNoQ3RybCBhcyBkYXNoQ3RybFwiXHJcblx0XHRcdH0pXHJcblx0XHRcdC5zdGF0ZShcIk1lbWJlcnNcIiwge1xyXG5cdFx0XHRcdHVybDogXCIvbWVtYmVyc1wiLFxyXG5cdFx0XHRcdHBhcmVudDogXCJQbGF0Zm9ybVwiLFxyXG5cdFx0XHRcdHRlbXBsYXRlVXJsOiBcIi9hcHAvbWVtYmVycy5odG1sXCIsXHJcblx0XHRcdFx0Y29udHJvbGxlcjogXCJNZW1iZXJzQ3RybCBhcyBtZW1iZXJzQ3RybFwiXHJcblx0XHRcdH0pXHJcblx0XHRcdC5zdGF0ZShcIkdyb3Vwc1wiLCB7XHJcblx0XHRcdFx0dXJsOiBcIi9ncm91cHNcIixcclxuXHRcdFx0XHRwYXJlbnQ6IFwiUGxhdGZvcm1cIixcclxuXHRcdFx0XHR0ZW1wbGF0ZVVybDogXCIvYXBwL2dyb3Vwcy5odG1sXCIsXHJcblx0XHRcdFx0Y29udHJvbGxlcjogXCJHcm91cHNDdHJsIGFzIGdyb3Vwc0N0cmxcIlxyXG5cdFx0XHR9KVxyXG5cdFx0XHQuc3RhdGUoXCJEaXN0cmljdHNcIiwge1xyXG5cdFx0XHRcdHVybDogXCIvZGlzdHJpY3RzXCIsXHJcblx0XHRcdFx0cGFyZW50OiBcIlBsYXRmb3JtXCIsXHJcblx0XHRcdFx0dGVtcGxhdGVVcmw6IFwiL2FwcC9kaXN0cmljdHMuaHRtbFwiLFxyXG5cdFx0XHRcdGNvbnRyb2xsZXI6IFwiRGlzdHJpY3RzQ3RybCBhcyBkaXN0cmljdHNDdHJsXCJcclxuXHRcdFx0fSk7XHJcblxyXG5cclxuXHR9XHJcblxyXG5cclxufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
