
/*
* created by waweru
*/


(function () {

	angular
		.module("pcea")
		.controller("MembersCtrl", ctrl);

	ctrl.$inject = ['$http', 'Notification'];

	function ctrl($http, Notification) {

		var self = this;

		self.data = [];
		self.showFilters = false;
		self.selectors = {};
		self.filters = {};
		self.districts = [];
		self.congregations = [];
		self.getCongregations = getCongregations;
		self.getDistricts = getDistricts;
		self.getAllMembers = getAllMembers;
		self.removeMember = removeMember;


		function getCongregations() {
			$http({
				url: "/api/congregation/",
				method: "GET"
			})
				.then(function (done) {
					self.congregations = done.data;
				})
				.catch(function () {
					Notification.error({
						message: "<p>Error couldn't per request. Please try again</p>",
						delay: 2500,
						title: "Error !"
					});
				});
		}

		function getDistricts() {
			$http({
				url: "/api/districts/",
				method: "GET"
			})
				.then(function (done) {
					self.districts = done.data;
				})
				.catch(function () {
					Notification.error({
						message: "<p>Error couldn't per request. Please try again</p>",
						delay: 2500,
						title: "Error !"
					});
				});
		}

		function getAllMembers(){

		}

		function removeMember(){

		}
		
	}

})();