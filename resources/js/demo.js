angular.module("demo", ["ngstrapModals"])
  .controller("demoCtrl", ["$scope", "ngstrapModals", function ($scope, ngstrapModals) {

    $scope.openAlert = function () {
      ngstrapModals.alert({
        heading: "Howdy!",
        description: "Hello from an alert modal dialog. Please click on Ok to dismiss."
      });
    };

    $scope.openCustomAlert = function () {
      ngstrapModals.alert({
        heading: "Hello again!",
        description: "If you notice, my dismissal button text is <strong>Dismiss</strong>.",
        okButtonText: "Dismiss"
      });
    };

    $scope.openConfirm = function () {
      ngstrapModals.confirm({
        heading: "Did you like this plugin?"
      }).then(function (response) {
        if (response) {
          ngstrapModals.alert({
            heading: ":)",
            description: "Thank you!",
            okButtonText: "Close"
          });
        } else {
          ngstrapModals.alert({
            heading: ":(",
            description: "We'll try to improve it.",
            okButtonText: "Close"
          });
        }
      });
    };

    $scope.openPrompt = function () {
      ngstrapModals.prompt({
        heading: "Hey visitor, what's your name?"
      }).then(function(response) {
        if (!response) {
          ngstrapModals.alert({
            description: "No problem! We'll call you visitor.",
            okButtonText: "Okay"
          });
        } else {
          ngstrapModals.alert({
            description: "Hello " + response + "! Nice meeting you.",
            okButtonText: "Okay"
          });
        }
      });
    };
  }]);
