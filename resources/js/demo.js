angular.module("demo", ["ngstrapModals"])
  .controller("demoCtrl", ["ngstrapModals", function ($ngstrapModals) {
    $ngstrapModals.alert();
  }]);
