
/*
* created by waweru
*/


(function () {

	angular
		.module("pcea")
		.controller("DashCtrl", ctrl);

	ctrl.$inject = ["$uibModal", "$http", 'Notification'];

	function ctrl($uibModal, $http, Notification) {

		var self = this;

		self.congregation = {
			data: [],
			open: congregationModalOpen,
			getAll: getAllCongregation,
			remove: removeCongregation
		};

		function congregationModalOpen(state, id) {

			var modalConfig = {
				animation: true,
				templateUrl: '/app/congregation.html',
				keyboard: false,
				backDrop: 'static',
				controller: 'CongregationCtrl',
				controllerAs: "congregationCtrl",
				resolve: {
					modal_state: function () {
						return {
							state: state,
							id: (id !== null) ? id : null
						};
					}
				}
			};

			$uibModal
				.open(modalConfig)
				.result
				.then(function () {
					Notification
						.primary({
							message: "<p>Congregation(s) added / updated</p>",
							delay: 2500,
							title: "Notification"
						});
					self.congregation.getAll();
				});
		}

		function getAllCongregation() {

			$http({
				url: "/api/congregation/",
				method: "GET"
			})
				.then(function (done) {
					self.congregation.data = done.data;
				})
				.catch(function () {
					Notification.error({
						message: "<p>Error couldn't per request. Please try again</p>",
						delay: 2500,
						title: "Error !"
					});
				});
		}

		function removeCongregation(id) {
			$http({
				url: "/api/congregation/"+id,
				method: "DELETE"
			})
				.then(function (done) {

					self.congregation.getAll();

					Notification.success({
						message: "<p>Successfully removed "+ done.data.name + "</p>",
						delay: 2500,
						title: "Successful !"
					});
					
				})
				.catch(function () {
					Notification.error({
						message: "<p>Error couldn't per request. Please try again</p>",
						delay: 2500,
						title: "Error !"
					});
				});
		}


	}

})();