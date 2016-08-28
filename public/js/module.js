
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
/**
 * Created by waweru on 5/12/2016.
 */

(function () {

    angular
        .module("pcea")
        .controller("CongregationCtrl", ctrl);

    ctrl.$inject = ['$uibModalInstance', 'modal_state', '$http', 'Notification'];

    function ctrl($uibModalInstance, modal_state, $http, Notification) {

        var self = this;

        self.state = modal_state;
        self.current = {}; // holds data from forms ( namespaced when the forms are multiple )
        self.congregation = {
            add: addCongregation,
            getOne: getOneCongregation,
            update: updateCongregation
        };
        self.closeModal = closeModal;


        /* implementation */
        function addCongregation(data) {

            $http({
                url: "/api/congregation",
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

        function getOneCongregation(id) {
            $http({
                url: "/api/congregation/"+id,
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

        function updateCongregation(id, data) {
            $http({
                url: "/api/congregation/"+id,
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

        function closeModal() {
            $uibModalInstance
                .close();
        }


        // all init code goes down here!
        if (modal_state.id !== null) self.congregation.getOne(modal_state.id);

    }

})();


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

/*
* created by waweru
*/


(function () {

	angular
		.module("pcea")
		.controller("GroupsCtrl", ctrl);

	ctrl.$inject = [];

	function ctrl() {
		
	}

})();

/*
* created by waweru
*/


(function () {

	angular
		.module("pcea")
		.controller("LoginCtrl", ctrl);

	ctrl.$inject = [];

	function ctrl() {
		
	}

})();

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
/**
 * Created by waweru on 5/12/2016.
 */

(function () {

    angular
        .module("pcea")
        .controller("PlatformCtrl", ctrl);

    ctrl.$inject = [];

    function ctrl() {

    }

})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhc2hib2FyZC9kYXNoYm9hcmQuanMiLCJkYXNoYm9hcmQvbW9kYWwuY29uZ3JlZ2F0aW9uLmpzIiwiZGlzdHJpY3RzL2Rpc3RyaWN0cy5qcyIsImdyb3Vwcy9ncm91cHMuanMiLCJsb2dpbi9sb2dpbi5qcyIsIm1lbWJlcnMvbWVtYmVyLmpzIiwicGxhdGZvcm0vcGxhdGZvcm0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLypcclxuKiBjcmVhdGVkIGJ5IHdhd2VydVxyXG4qL1xyXG5cclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcblxyXG5cdGFuZ3VsYXJcclxuXHRcdC5tb2R1bGUoXCJwY2VhXCIpXHJcblx0XHQuY29udHJvbGxlcihcIkRhc2hDdHJsXCIsIGN0cmwpO1xyXG5cclxuXHRjdHJsLiRpbmplY3QgPSBbXCIkdWliTW9kYWxcIiwgXCIkaHR0cFwiLCAnTm90aWZpY2F0aW9uJ107XHJcblxyXG5cdGZ1bmN0aW9uIGN0cmwoJHVpYk1vZGFsLCAkaHR0cCwgTm90aWZpY2F0aW9uKSB7XHJcblxyXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuXHRcdHNlbGYuY29uZ3JlZ2F0aW9uID0ge1xyXG5cdFx0XHRkYXRhOiBbXSxcclxuXHRcdFx0b3BlbjogY29uZ3JlZ2F0aW9uTW9kYWxPcGVuLFxyXG5cdFx0XHRnZXRBbGw6IGdldEFsbENvbmdyZWdhdGlvbixcclxuXHRcdFx0cmVtb3ZlOiByZW1vdmVDb25ncmVnYXRpb25cclxuXHRcdH07XHJcblxyXG5cdFx0ZnVuY3Rpb24gY29uZ3JlZ2F0aW9uTW9kYWxPcGVuKHN0YXRlLCBpZCkge1xyXG5cclxuXHRcdFx0dmFyIG1vZGFsQ29uZmlnID0ge1xyXG5cdFx0XHRcdGFuaW1hdGlvbjogdHJ1ZSxcclxuXHRcdFx0XHR0ZW1wbGF0ZVVybDogJy9hcHAvY29uZ3JlZ2F0aW9uLmh0bWwnLFxyXG5cdFx0XHRcdGtleWJvYXJkOiBmYWxzZSxcclxuXHRcdFx0XHRiYWNrRHJvcDogJ3N0YXRpYycsXHJcblx0XHRcdFx0Y29udHJvbGxlcjogJ0NvbmdyZWdhdGlvbkN0cmwnLFxyXG5cdFx0XHRcdGNvbnRyb2xsZXJBczogXCJjb25ncmVnYXRpb25DdHJsXCIsXHJcblx0XHRcdFx0cmVzb2x2ZToge1xyXG5cdFx0XHRcdFx0bW9kYWxfc3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdFx0XHRzdGF0ZTogc3RhdGUsXHJcblx0XHRcdFx0XHRcdFx0aWQ6IChpZCAhPT0gbnVsbCkgPyBpZCA6IG51bGxcclxuXHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHQkdWliTW9kYWxcclxuXHRcdFx0XHQub3Blbihtb2RhbENvbmZpZylcclxuXHRcdFx0XHQucmVzdWx0XHJcblx0XHRcdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0Tm90aWZpY2F0aW9uXHJcblx0XHRcdFx0XHRcdC5wcmltYXJ5KHtcclxuXHRcdFx0XHRcdFx0XHRtZXNzYWdlOiBcIjxwPkNvbmdyZWdhdGlvbihzKSBhZGRlZCAvIHVwZGF0ZWQ8L3A+XCIsXHJcblx0XHRcdFx0XHRcdFx0ZGVsYXk6IDI1MDAsXHJcblx0XHRcdFx0XHRcdFx0dGl0bGU6IFwiTm90aWZpY2F0aW9uXCJcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRzZWxmLmNvbmdyZWdhdGlvbi5nZXRBbGwoKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBnZXRBbGxDb25ncmVnYXRpb24oKSB7XHJcblxyXG5cdFx0XHQkaHR0cCh7XHJcblx0XHRcdFx0dXJsOiBcIi9hcGkvY29uZ3JlZ2F0aW9uL1wiLFxyXG5cdFx0XHRcdG1ldGhvZDogXCJHRVRcIlxyXG5cdFx0XHR9KVxyXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uIChkb25lKSB7XHJcblx0XHRcdFx0XHRzZWxmLmNvbmdyZWdhdGlvbi5kYXRhID0gZG9uZS5kYXRhO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LmNhdGNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdE5vdGlmaWNhdGlvbi5lcnJvcih7XHJcblx0XHRcdFx0XHRcdG1lc3NhZ2U6IFwiPHA+RXJyb3IgY291bGRuJ3QgcGVyIHJlcXVlc3QuIFBsZWFzZSB0cnkgYWdhaW48L3A+XCIsXHJcblx0XHRcdFx0XHRcdGRlbGF5OiAyNTAwLFxyXG5cdFx0XHRcdFx0XHR0aXRsZTogXCJFcnJvciAhXCJcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHJlbW92ZUNvbmdyZWdhdGlvbihpZCkge1xyXG5cdFx0XHQkaHR0cCh7XHJcblx0XHRcdFx0dXJsOiBcIi9hcGkvY29uZ3JlZ2F0aW9uL1wiK2lkLFxyXG5cdFx0XHRcdG1ldGhvZDogXCJERUxFVEVcIlxyXG5cdFx0XHR9KVxyXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uIChkb25lKSB7XHJcblxyXG5cdFx0XHRcdFx0c2VsZi5jb25ncmVnYXRpb24uZ2V0QWxsKCk7XHJcblxyXG5cdFx0XHRcdFx0Tm90aWZpY2F0aW9uLnN1Y2Nlc3Moe1xyXG5cdFx0XHRcdFx0XHRtZXNzYWdlOiBcIjxwPlN1Y2Nlc3NmdWxseSByZW1vdmVkIFwiKyBkb25lLmRhdGEubmFtZSArIFwiPC9wPlwiLFxyXG5cdFx0XHRcdFx0XHRkZWxheTogMjUwMCxcclxuXHRcdFx0XHRcdFx0dGl0bGU6IFwiU3VjY2Vzc2Z1bCAhXCJcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQuY2F0Y2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0Tm90aWZpY2F0aW9uLmVycm9yKHtcclxuXHRcdFx0XHRcdFx0bWVzc2FnZTogXCI8cD5FcnJvciBjb3VsZG4ndCBwZXIgcmVxdWVzdC4gUGxlYXNlIHRyeSBhZ2FpbjwvcD5cIixcclxuXHRcdFx0XHRcdFx0ZGVsYXk6IDI1MDAsXHJcblx0XHRcdFx0XHRcdHRpdGxlOiBcIkVycm9yICFcIlxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cclxuXHR9XHJcblxyXG59KSgpOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHdhd2VydSBvbiA1LzEyLzIwMTYuXHJcbiAqL1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZShcInBjZWFcIilcclxuICAgICAgICAuY29udHJvbGxlcihcIkNvbmdyZWdhdGlvbkN0cmxcIiwgY3RybCk7XHJcblxyXG4gICAgY3RybC4kaW5qZWN0ID0gWyckdWliTW9kYWxJbnN0YW5jZScsICdtb2RhbF9zdGF0ZScsICckaHR0cCcsICdOb3RpZmljYXRpb24nXTtcclxuXHJcbiAgICBmdW5jdGlvbiBjdHJsKCR1aWJNb2RhbEluc3RhbmNlLCBtb2RhbF9zdGF0ZSwgJGh0dHAsIE5vdGlmaWNhdGlvbikge1xyXG5cclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHNlbGYuc3RhdGUgPSBtb2RhbF9zdGF0ZTtcclxuICAgICAgICBzZWxmLmN1cnJlbnQgPSB7fTsgLy8gaG9sZHMgZGF0YSBmcm9tIGZvcm1zICggbmFtZXNwYWNlZCB3aGVuIHRoZSBmb3JtcyBhcmUgbXVsdGlwbGUgKVxyXG4gICAgICAgIHNlbGYuY29uZ3JlZ2F0aW9uID0ge1xyXG4gICAgICAgICAgICBhZGQ6IGFkZENvbmdyZWdhdGlvbixcclxuICAgICAgICAgICAgZ2V0T25lOiBnZXRPbmVDb25ncmVnYXRpb24sXHJcbiAgICAgICAgICAgIHVwZGF0ZTogdXBkYXRlQ29uZ3JlZ2F0aW9uXHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZWxmLmNsb3NlTW9kYWwgPSBjbG9zZU1vZGFsO1xyXG5cclxuXHJcbiAgICAgICAgLyogaW1wbGVtZW50YXRpb24gKi9cclxuICAgICAgICBmdW5jdGlvbiBhZGRDb25ncmVnYXRpb24oZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgJGh0dHAoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBcIi9hcGkvY29uZ3JlZ2F0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRvbmUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgTm90aWZpY2F0aW9uLnN1Y2Nlc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIjxwPiBTdWNjZXNzZnVsbHkgYWRkZWQgXCIrIGRvbmUuZGF0YS5uYW1lICsgXCI8L3A+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGF5OiAyNTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJTdWNjZXNzZnVsICFcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgTm90aWZpY2F0aW9uLmVycm9yKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCI8cD5FcnJvciBjb3VsZG4ndCBwZXIgcmVxdWVzdC4gUGxlYXNlIHRyeSBhZ2FpbjwvcD5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsYXk6IDI1MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkVycm9yICFcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRPbmVDb25ncmVnYXRpb24oaWQpIHtcclxuICAgICAgICAgICAgJGh0dHAoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBcIi9hcGkvY29uZ3JlZ2F0aW9uL1wiK2lkLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZG9uZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudCA9IGRvbmUuZGF0YTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIE5vdGlmaWNhdGlvbi5lcnJvcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiPHA+RXJyb3IgY291bGRuJ3QgcGVyIHJlcXVlc3QuIFBsZWFzZSB0cnkgYWdhaW48L3A+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGF5OiAyNTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJFcnJvciAhXCJcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlQ29uZ3JlZ2F0aW9uKGlkLCBkYXRhKSB7XHJcbiAgICAgICAgICAgICRodHRwKHtcclxuICAgICAgICAgICAgICAgIHVybDogXCIvYXBpL2NvbmdyZWdhdGlvbi9cIitpZCxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkb25lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTm90aWZpY2F0aW9uLnN1Y2Nlc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIjxwPiBTdWNjZXNzZnVsbHkgdXBkYXRlZCBcIisgZG9uZS5kYXRhLm5hbWUgKyBcIjwvcD5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsYXk6IDI1MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlN1Y2Nlc3NmdWwgIVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jbG9zZU1vZGFsKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBOb3RpZmljYXRpb24uZXJyb3Ioe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIjxwPkVycm9yIGNvdWxkbid0IHBlciByZXF1ZXN0LiBQbGVhc2UgdHJ5IGFnYWluPC9wPlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxheTogMjUwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRXJyb3IgIVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNsb3NlTW9kYWwoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICAuY2xvc2UoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvLyBhbGwgaW5pdCBjb2RlIGdvZXMgZG93biBoZXJlIVxyXG4gICAgICAgIGlmIChtb2RhbF9zdGF0ZS5pZCAhPT0gbnVsbCkgc2VsZi5jb25ncmVnYXRpb24uZ2V0T25lKG1vZGFsX3N0YXRlLmlkKTtcclxuXHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG4iLCJcclxuLypcclxuKiBjcmVhdGVkIGJ5IHdhd2VydVxyXG4qL1xyXG5cclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcblxyXG5cdGFuZ3VsYXJcclxuXHRcdC5tb2R1bGUoXCJwY2VhXCIpXHJcblx0XHQuY29udHJvbGxlcihcIkRpc3RyaWN0c0N0cmxcIiwgY3RybCk7XHJcblxyXG5cdGN0cmwuJGluamVjdCA9IFsgJyR1aWJNb2RhbCcsICckaHR0cCcsICdOb3RpZmljYXRpb24nIF07XHJcblxyXG5cdGZ1bmN0aW9uIGN0cmwoJHVpYk1vZGFsLCAkaHR0cCwgTm90aWZpY2F0aW9uKSB7XHJcblxyXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuXHRcdHNlbGYuZGF0YSA9IFtdO1xyXG5cdFx0c2VsZi5vcGVuTW9kYWwgPSBvcGVuTW9kYWw7XHJcblx0XHRzZWxmLmdldEFsbERpc3RyaWN0cyA9IGdldEFsbERpc3RyaWN0cztcclxuXHRcdHNlbGYucmVtb3ZlRGlzdHJpY3QgPSByZW1vdmVEaXN0cmljdDtcclxuXHJcblxyXG5cdFx0ZnVuY3Rpb24gb3Blbk1vZGFsKHN0YXRlLCBpZCkge1xyXG5cclxuXHRcdFx0dmFyIG1vZGFsQ29uZmlnID0ge1xyXG5cdFx0XHRcdGFuaW1hdGlvbjogdHJ1ZSxcclxuXHRcdFx0XHR0ZW1wbGF0ZVVybDogJy9hcHAvbW9kYWwuZGlzdHJpY3QuaHRtbCcsXHJcblx0XHRcdFx0a2V5Ym9hcmQ6IGZhbHNlLFxyXG5cdFx0XHRcdGJhY2tEcm9wOiAnc3RhdGljJyxcclxuXHRcdFx0XHRjb250cm9sbGVyOiAnRGlzdHJpY3RzTW9kYWxDdHJsJyxcclxuXHRcdFx0XHRjb250cm9sbGVyQXM6IFwiRE1DdHJsXCIsXHJcblx0XHRcdFx0cmVzb2x2ZToge1xyXG5cdFx0XHRcdFx0bW9kYWxfc3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdFx0XHRzdGF0ZTogc3RhdGUsXHJcblx0XHRcdFx0XHRcdFx0aWQ6IChpZCAhPT0gbnVsbCkgPyBpZCA6IG51bGxcclxuXHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHQkdWliTW9kYWxcclxuXHRcdFx0XHQub3Blbihtb2RhbENvbmZpZylcclxuXHRcdFx0XHQucmVzdWx0XHJcblx0XHRcdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0Tm90aWZpY2F0aW9uXHJcblx0XHRcdFx0XHRcdC5wcmltYXJ5KHtcclxuXHRcdFx0XHRcdFx0XHRtZXNzYWdlOiBcIjxwPkRpc3RyaWN0KHMpIGFkZGVkIC8gdXBkYXRlZDwvcD5cIixcclxuXHRcdFx0XHRcdFx0XHRkZWxheTogMjUwMCxcclxuXHRcdFx0XHRcdFx0XHR0aXRsZTogXCJOb3RpZmljYXRpb25cIlxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdHNlbGYuZ2V0QWxsRGlzdHJpY3RzKCk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGdldEFsbERpc3RyaWN0cygpIHtcclxuXHRcdFx0JGh0dHAoe1xyXG5cdFx0XHRcdHVybDogXCIvYXBpL2Rpc3RyaWN0cy9cIixcclxuXHRcdFx0XHRtZXRob2Q6IFwiR0VUXCJcclxuXHRcdFx0fSlcclxuXHRcdFx0XHQudGhlbihmdW5jdGlvbiAoZG9uZSkge1xyXG5cdFx0XHRcdFx0c2VsZi5kYXRhID0gZG9uZS5kYXRhO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LmNhdGNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdE5vdGlmaWNhdGlvbi5lcnJvcih7XHJcblx0XHRcdFx0XHRcdG1lc3NhZ2U6IFwiPHA+RXJyb3IgY291bGRuJ3QgcGVyIHJlcXVlc3QuIFBsZWFzZSB0cnkgYWdhaW48L3A+XCIsXHJcblx0XHRcdFx0XHRcdGRlbGF5OiAyNTAwLFxyXG5cdFx0XHRcdFx0XHR0aXRsZTogXCJFcnJvciAhXCJcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHJlbW92ZURpc3RyaWN0KGlkKSB7XHJcblx0XHRcdCRodHRwKHtcclxuXHRcdFx0XHR1cmw6IFwiL2FwaS9kaXN0cmljdHMvXCIraWQsXHJcblx0XHRcdFx0bWV0aG9kOiBcIkRFTEVURVwiXHJcblx0XHRcdH0pXHJcblx0XHRcdFx0LnRoZW4oZnVuY3Rpb24gKGRvbmUpIHtcclxuXHJcblx0XHRcdFx0XHRzZWxmLmdldEFsbERpc3RyaWN0cygpO1xyXG5cclxuXHRcdFx0XHRcdE5vdGlmaWNhdGlvbi5zdWNjZXNzKHtcclxuXHRcdFx0XHRcdFx0bWVzc2FnZTogXCI8cD5TdWNjZXNzZnVsbHkgcmVtb3ZlZCBcIisgZG9uZS5kYXRhLm5hbWUgKyBcIjwvcD5cIixcclxuXHRcdFx0XHRcdFx0ZGVsYXk6IDI1MDAsXHJcblx0XHRcdFx0XHRcdHRpdGxlOiBcIlN1Y2Nlc3NmdWwgIVwiXHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQuY2F0Y2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0Tm90aWZpY2F0aW9uLmVycm9yKHtcclxuXHRcdFx0XHRcdFx0bWVzc2FnZTogXCI8cD5FcnJvciBjb3VsZG4ndCBwZXIgcmVxdWVzdC4gUGxlYXNlIHRyeSBhZ2FpbjwvcD5cIixcclxuXHRcdFx0XHRcdFx0ZGVsYXk6IDI1MDAsXHJcblx0XHRcdFx0XHRcdHRpdGxlOiBcIkVycm9yICFcIlxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cclxuXHR9XHJcblxyXG59KSgpO1xyXG5cclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcblxyXG5cdGFuZ3VsYXJcclxuXHRcdC5tb2R1bGUoXCJwY2VhXCIpXHJcblx0XHQuY29udHJvbGxlcihcIkRpc3RyaWN0c01vZGFsQ3RybFwiLCBjdHJsKTtcclxuXHJcblxyXG5cdGN0cmwuJGluamVjdCA9IFsgJyR1aWJNb2RhbEluc3RhbmNlJyAsJ21vZGFsX3N0YXRlJywgJ05vdGlmaWNhdGlvbicsICckaHR0cCcgXTtcclxuXHJcblx0ZnVuY3Rpb24gY3RybCgkdWliTW9kYWxJbnN0YW5jZSwgbW9kYWxfc3RhdGUsIE5vdGlmaWNhdGlvbiwgJGh0dHApIHtcclxuXHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG5cdFx0c2VsZi5jdXJyZW50ID0ge307XHJcblx0XHRzZWxmLmNvbmdyZWdhdGlvbnMgPSBbXTtcclxuXHRcdHNlbGYuc3RhdGUgPSBtb2RhbF9zdGF0ZTtcclxuXHRcdHNlbGYuY2xvc2VNb2RhbCA9IGNsb3NlTW9kYWw7XHJcblx0XHRzZWxmLmdldENvbmdyZWdhdGlvbnMgPSBnZXRDb25ncmVnYXRpb25zO1xyXG5cdFx0c2VsZi5hZGREaXN0cmljdCA9IGFkZERpc3RyaWN0O1xyXG5cdFx0c2VsZi5nZXREaXN0cmljdCA9IGdldERpc3RyaWN0O1xyXG5cdFx0c2VsZi51cGRhdGVEaXN0cmljdCA9IHVwZGF0ZURpc3RyaWN0O1xyXG5cclxuXHJcblx0XHRmdW5jdGlvbiBjbG9zZU1vZGFsKCkge1xyXG5cdFx0XHQkdWliTW9kYWxJbnN0YW5jZVxyXG5cdFx0XHRcdC5jbG9zZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGdldENvbmdyZWdhdGlvbnMoKSB7XHJcblxyXG5cdFx0XHQkaHR0cCh7XHJcblx0XHRcdFx0dXJsOiBcIi9hcGkvY29uZ3JlZ2F0aW9uL1wiLFxyXG5cdFx0XHRcdG1ldGhvZDogXCJHRVRcIlxyXG5cdFx0XHR9KVxyXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uIChkb25lKSB7XHJcblx0XHRcdFx0XHRzZWxmLmNvbmdyZWdhdGlvbnMgPSBkb25lLmRhdGE7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQuY2F0Y2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0Tm90aWZpY2F0aW9uLmVycm9yKHtcclxuXHRcdFx0XHRcdFx0bWVzc2FnZTogXCI8cD5FcnJvciBjb3VsZG4ndCBwZXIgcmVxdWVzdC4gUGxlYXNlIHRyeSBhZ2FpbjwvcD5cIixcclxuXHRcdFx0XHRcdFx0ZGVsYXk6IDI1MDAsXHJcblx0XHRcdFx0XHRcdHRpdGxlOiBcIkVycm9yICFcIlxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gYWRkRGlzdHJpY3QoZGF0YSkge1xyXG5cdFx0XHQkaHR0cCh7XHJcblx0XHRcdFx0dXJsOiBcIi9hcGkvZGlzdHJpY3RzXCIsXHJcblx0XHRcdFx0bWV0aG9kOiBcIlBPU1RcIixcclxuXHRcdFx0XHRkYXRhOiBkYXRhXHJcblx0XHRcdH0pXHJcblx0XHRcdFx0LnRoZW4oZnVuY3Rpb24gKGRvbmUpIHtcclxuXHJcblx0XHRcdFx0XHROb3RpZmljYXRpb24uc3VjY2Vzcyh7XHJcblx0XHRcdFx0XHRcdG1lc3NhZ2U6IFwiPHA+IFN1Y2Nlc3NmdWxseSBhZGRlZCBcIisgZG9uZS5kYXRhLm5hbWUgKyBcIjwvcD5cIixcclxuXHRcdFx0XHRcdFx0ZGVsYXk6IDI1MDAsXHJcblx0XHRcdFx0XHRcdHRpdGxlOiBcIlN1Y2Nlc3NmdWwgIVwiXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5jYXRjaChmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHRcdFx0Tm90aWZpY2F0aW9uLmVycm9yKHtcclxuXHRcdFx0XHRcdFx0bWVzc2FnZTogXCI8cD5FcnJvciBjb3VsZG4ndCBwZXIgcmVxdWVzdC4gUGxlYXNlIHRyeSBhZ2FpbjwvcD5cIixcclxuXHRcdFx0XHRcdFx0ZGVsYXk6IDI1MDAsXHJcblx0XHRcdFx0XHRcdHRpdGxlOiBcIkVycm9yICFcIlxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gZ2V0RGlzdHJpY3QoaWQpIHtcclxuXHRcdFx0JGh0dHAoe1xyXG5cdFx0XHRcdHVybDogXCIvYXBpL2Rpc3RyaWN0cy9cIitpZCxcclxuXHRcdFx0XHRtZXRob2Q6IFwiR0VUXCJcclxuXHRcdFx0fSlcclxuXHRcdFx0XHQudGhlbihmdW5jdGlvbiAoZG9uZSkge1xyXG5cdFx0XHRcdFx0c2VsZi5jdXJyZW50ID0gZG9uZS5kYXRhO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LmNhdGNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdE5vdGlmaWNhdGlvbi5lcnJvcih7XHJcblx0XHRcdFx0XHRcdG1lc3NhZ2U6IFwiPHA+RXJyb3IgY291bGRuJ3QgcGVyIHJlcXVlc3QuIFBsZWFzZSB0cnkgYWdhaW48L3A+XCIsXHJcblx0XHRcdFx0XHRcdGRlbGF5OiAyNTAwLFxyXG5cdFx0XHRcdFx0XHR0aXRsZTogXCJFcnJvciAhXCJcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHVwZGF0ZURpc3RyaWN0KGlkLCBkYXRhKSB7XHJcblx0XHRcdCRodHRwKHtcclxuXHRcdFx0XHR1cmw6IFwiL2FwaS9kaXN0cmljdHMvXCIraWQsXHJcblx0XHRcdFx0bWV0aG9kOiBcIlBVVFwiLFxyXG5cdFx0XHRcdGRhdGE6IGRhdGFcclxuXHRcdFx0fSlcclxuXHRcdFx0XHQudGhlbihmdW5jdGlvbiAoZG9uZSkge1xyXG5cdFx0XHRcdFx0Tm90aWZpY2F0aW9uLnN1Y2Nlc3Moe1xyXG5cdFx0XHRcdFx0XHRtZXNzYWdlOiBcIjxwPiBTdWNjZXNzZnVsbHkgdXBkYXRlZCBcIisgZG9uZS5kYXRhLm5hbWUgKyBcIjwvcD5cIixcclxuXHRcdFx0XHRcdFx0ZGVsYXk6IDI1MDAsXHJcblx0XHRcdFx0XHRcdHRpdGxlOiBcIlN1Y2Nlc3NmdWwgIVwiXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdHNlbGYuY2xvc2VNb2RhbCgpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LmNhdGNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdE5vdGlmaWNhdGlvbi5lcnJvcih7XHJcblx0XHRcdFx0XHRcdG1lc3NhZ2U6IFwiPHA+RXJyb3IgY291bGRuJ3QgcGVyIHJlcXVlc3QuIFBsZWFzZSB0cnkgYWdhaW48L3A+XCIsXHJcblx0XHRcdFx0XHRcdGRlbGF5OiAyNTAwLFxyXG5cdFx0XHRcdFx0XHR0aXRsZTogXCJFcnJvciAhXCJcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRpZiAobW9kYWxfc3RhdGUuaWQgIT09IG51bGwpIHNlbGYuZ2V0RGlzdHJpY3QobW9kYWxfc3RhdGUuaWQpO1xyXG5cclxuXHR9XHJcblxyXG5cclxufSkoKTsiLCJcclxuLypcclxuKiBjcmVhdGVkIGJ5IHdhd2VydVxyXG4qL1xyXG5cclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcblxyXG5cdGFuZ3VsYXJcclxuXHRcdC5tb2R1bGUoXCJwY2VhXCIpXHJcblx0XHQuY29udHJvbGxlcihcIkdyb3Vwc0N0cmxcIiwgY3RybCk7XHJcblxyXG5cdGN0cmwuJGluamVjdCA9IFtdO1xyXG5cclxuXHRmdW5jdGlvbiBjdHJsKCkge1xyXG5cdFx0XHJcblx0fVxyXG5cclxufSkoKTsiLCJcclxuLypcclxuKiBjcmVhdGVkIGJ5IHdhd2VydVxyXG4qL1xyXG5cclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcblxyXG5cdGFuZ3VsYXJcclxuXHRcdC5tb2R1bGUoXCJwY2VhXCIpXHJcblx0XHQuY29udHJvbGxlcihcIkxvZ2luQ3RybFwiLCBjdHJsKTtcclxuXHJcblx0Y3RybC4kaW5qZWN0ID0gW107XHJcblxyXG5cdGZ1bmN0aW9uIGN0cmwoKSB7XHJcblx0XHRcclxuXHR9XHJcblxyXG59KSgpOyIsIlxyXG4vKlxyXG4qIGNyZWF0ZWQgYnkgd2F3ZXJ1XHJcbiovXHJcblxyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuXHJcblx0YW5ndWxhclxyXG5cdFx0Lm1vZHVsZShcInBjZWFcIilcclxuXHRcdC5jb250cm9sbGVyKFwiTWVtYmVyc0N0cmxcIiwgY3RybCk7XHJcblxyXG5cdGN0cmwuJGluamVjdCA9IFsnJGh0dHAnLCAnTm90aWZpY2F0aW9uJ107XHJcblxyXG5cdGZ1bmN0aW9uIGN0cmwoJGh0dHAsIE5vdGlmaWNhdGlvbikge1xyXG5cclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHJcblx0XHRzZWxmLmRhdGEgPSBbXTtcclxuXHRcdHNlbGYuc2hvd0ZpbHRlcnMgPSBmYWxzZTtcclxuXHRcdHNlbGYuc2VsZWN0b3JzID0ge307XHJcblx0XHRzZWxmLmZpbHRlcnMgPSB7fTtcclxuXHRcdHNlbGYuZGlzdHJpY3RzID0gW107XHJcblx0XHRzZWxmLmNvbmdyZWdhdGlvbnMgPSBbXTtcclxuXHRcdHNlbGYuZ2V0Q29uZ3JlZ2F0aW9ucyA9IGdldENvbmdyZWdhdGlvbnM7XHJcblx0XHRzZWxmLmdldERpc3RyaWN0cyA9IGdldERpc3RyaWN0cztcclxuXHRcdHNlbGYuZ2V0QWxsTWVtYmVycyA9IGdldEFsbE1lbWJlcnM7XHJcblx0XHRzZWxmLnJlbW92ZU1lbWJlciA9IHJlbW92ZU1lbWJlcjtcclxuXHJcblxyXG5cdFx0ZnVuY3Rpb24gZ2V0Q29uZ3JlZ2F0aW9ucygpIHtcclxuXHRcdFx0JGh0dHAoe1xyXG5cdFx0XHRcdHVybDogXCIvYXBpL2NvbmdyZWdhdGlvbi9cIixcclxuXHRcdFx0XHRtZXRob2Q6IFwiR0VUXCJcclxuXHRcdFx0fSlcclxuXHRcdFx0XHQudGhlbihmdW5jdGlvbiAoZG9uZSkge1xyXG5cdFx0XHRcdFx0c2VsZi5jb25ncmVnYXRpb25zID0gZG9uZS5kYXRhO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LmNhdGNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdE5vdGlmaWNhdGlvbi5lcnJvcih7XHJcblx0XHRcdFx0XHRcdG1lc3NhZ2U6IFwiPHA+RXJyb3IgY291bGRuJ3QgcGVyIHJlcXVlc3QuIFBsZWFzZSB0cnkgYWdhaW48L3A+XCIsXHJcblx0XHRcdFx0XHRcdGRlbGF5OiAyNTAwLFxyXG5cdFx0XHRcdFx0XHR0aXRsZTogXCJFcnJvciAhXCJcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGdldERpc3RyaWN0cygpIHtcclxuXHRcdFx0JGh0dHAoe1xyXG5cdFx0XHRcdHVybDogXCIvYXBpL2Rpc3RyaWN0cy9cIixcclxuXHRcdFx0XHRtZXRob2Q6IFwiR0VUXCJcclxuXHRcdFx0fSlcclxuXHRcdFx0XHQudGhlbihmdW5jdGlvbiAoZG9uZSkge1xyXG5cdFx0XHRcdFx0c2VsZi5kaXN0cmljdHMgPSBkb25lLmRhdGE7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQuY2F0Y2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0Tm90aWZpY2F0aW9uLmVycm9yKHtcclxuXHRcdFx0XHRcdFx0bWVzc2FnZTogXCI8cD5FcnJvciBjb3VsZG4ndCBwZXIgcmVxdWVzdC4gUGxlYXNlIHRyeSBhZ2FpbjwvcD5cIixcclxuXHRcdFx0XHRcdFx0ZGVsYXk6IDI1MDAsXHJcblx0XHRcdFx0XHRcdHRpdGxlOiBcIkVycm9yICFcIlxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gZ2V0QWxsTWVtYmVycygpe1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiByZW1vdmVNZW1iZXIoKXtcclxuXHJcblx0XHR9XHJcblx0XHRcclxuXHR9XHJcblxyXG59KSgpOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHdhd2VydSBvbiA1LzEyLzIwMTYuXHJcbiAqL1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZShcInBjZWFcIilcclxuICAgICAgICAuY29udHJvbGxlcihcIlBsYXRmb3JtQ3RybFwiLCBjdHJsKTtcclxuXHJcbiAgICBjdHJsLiRpbmplY3QgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBjdHJsKCkge1xyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
