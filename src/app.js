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
