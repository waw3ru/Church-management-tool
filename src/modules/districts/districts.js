
/*
* created by waweru
*/


(function () {

	angular
		.module("pcea")
		.controller("DistrictsCtrl", ctrl);

	ctrl.$inject = [ '$uibModal', '$http', 'Notification' ];

	function ctrl($uibModal, $http, Notification) {

		var self = this;

		self.data = [];
		self.openModal = openModal;
		self.getAllDistricts = getAllDistricts;
		self.removeDistrict = removeDistrict;


		function openModal(state, id) {

			var modalConfig = {
				animation: true,
				templateUrl: '/app/modal.district.html',
				keyboard: false,
				backDrop: 'static',
				controller: 'DistrictsModalCtrl',
				controllerAs: "DMCtrl",
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
							message: "<p>District(s) added / updated</p>",
							delay: 2500,
							title: "Notification"
						});
					self.getAllDistricts();
				});

		}

		function getAllDistricts() {
			$http({
				url: "/api/districts/",
				method: "GET"
			})
				.then(function (done) {
					self.data = done.data;
				})
				.catch(function () {
					Notification.error({
						message: "<p>Error couldn't per request. Please try again</p>",
						delay: 2500,
						title: "Error !"
					});
				});
		}

		function removeDistrict(id) {
			$http({
				url: "/api/districts/"+id,
				method: "DELETE"
			})
				.then(function (done) {

					self.getAllDistricts();

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


(function () {

	angular
		.module("pcea")
		.controller("DistrictsModalCtrl", ctrl);


	ctrl.$inject = [ '$uibModalInstance' ,'modal_state', 'Notification', '$http' ];

	function ctrl($uibModalInstance, modal_state, Notification, $http) {

		var self = this;

		self.current = {};
		self.congregations = [];
		self.state = modal_state;
		self.closeModal = closeModal;
		self.getCongregations = getCongregations;
		self.addDistrict = addDistrict;
		self.getDistrict = getDistrict;
		self.updateDistrict = updateDistrict;


		function closeModal() {
			$uibModalInstance
				.close();
		}

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

		function addDistrict(data) {
			$http({
				url: "/api/districts",
				method: "POST",
				data: data
			})
				.then(function (done) {

					Notification.success({
						message: "<p> Successfully added "+ done.data.name + "</p>",
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

		function getDistrict(id) {
			$http({
				url: "/api/districts/"+id,
				method: "GET"
			})
				.then(function (done) {
					self.current = done.data;
				})
				.catch(function () {
					Notification.error({
						message: "<p>Error couldn't per request. Please try again</p>",
						delay: 2500,
						title: "Error !"
					});
				});
		}

		function updateDistrict(id, data) {
			$http({
				url: "/api/districts/"+id,
				method: "PUT",
				data: data
			})
				.then(function (done) {
					Notification.success({
						message: "<p> Successfully updated "+ done.data.name + "</p>",
						delay: 2500,
						title: "Successful !"
					});
					self.closeModal();
				})
				.catch(function () {
					Notification.error({
						message: "<p>Error couldn't per request. Please try again</p>",
						delay: 2500,
						title: "Error !"
					});
				});
		}


		if (modal_state.id !== null) self.getDistrict(modal_state.id);

	}


})();