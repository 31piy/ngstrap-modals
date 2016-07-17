angular.module("ngstrapModals", ["mgcrea.ngStrap", "ngSanitize"])

  .service("ngstrapModals", ["$modal", "$rootScope", "$q", function ($modal, $rootScope, $q) {

    var alert = function (options) {
      var scope = $rootScope.$new(false);

      var defaults = {
        title: "Alert",
        heading: "Test",
        subheading: "Please click on Ok to dismiss",
        okButtonText: "Ok"
      };

      scope.options = angular.extend(defaults, options);

      return $modal({
        templateUrl: "alert.html",
        scope: scope,
        show: true,
        backdrop: "static"
      });
    };

    var prompt = function (options) {
      var scope = $rootScope.$new(false);
      var deferred = $q.defer();

      var defaults = {
        title: "Prompt",
        heading: "Please provide a value",
        subheading: "",
        okButtonText: "Ok",
        cancelButtonText: "Cancel",
        placeholder: "",
        initValue: ""
      };

      scope.options = angular.extend(defaults, options);
      scope.promptInput = options.initValue;

      scope.answer = function (res) {
        deferred.resolve(res);
        prompt.hide();
      };

      var prompt = $modal({
        templateUrl: "prompt.html",
        scope: scope,
        show: true
        // backdrop: "static"
      });

      return deferred.promise;
    };

    var confirm = function (options) {
      var scope = $rootScope.$new(false);
      var deferred = $q.defer();

      var defaults = {
        title: "Confirmation",
        heading: "Are you sure?",
        subheading: "",
        okButtonText: "Yes",
        cancelButtonText: "No"
      };

      scope.options = angular.extend(defaults, options);

      scope.answer = function (res) {
        deferred.resolve(res);
        confirm.hide();
      };

      var confirm = $modal({
        templateUrl: "confirm.html",
        scope: scope,
        show: true
        // backdrop: "static"
      });

      return deferred.promise;
    };

    return {
      alert: alert,
      confirm: confirm,
      prompt: prompt
    };

  }]);
