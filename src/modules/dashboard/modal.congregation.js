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
