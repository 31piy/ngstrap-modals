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

angular.module("ngstrapModals", ["mgcrea.ngStrap", "ngSanitize"])

  .service("ngstrapModals", ["$modal", "$rootScope", "$q", function ($modal, $rootScope, $q) {

    var alert = function (options) {
      var scope = $rootScope.$new(false);

      var defaults = {
        title: "Alert",
        heading: "",
        description: "Please click on Ok to dismiss",
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
        description: "",
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
        show: true,
        backdrop: "static"
      });

      return deferred.promise;
    };

    var confirm = function (options) {
      var scope = $rootScope.$new(false);
      var deferred = $q.defer();

      var defaults = {
        title: "Confirmation",
        heading: "Are you sure?",
        description: "",
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
        show: true,
        backdrop: "static"
      });

      return deferred.promise;
    };

    return {
      alert: alert,
      confirm: confirm,
      prompt: prompt
    };

  }]);

angular.module('ngstrapModals').run(['$templateCache', function($templateCache) {$templateCache.put('alert.html','<div class="modal" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" ng-click="$hide()">&times;</button><h4 class="modal-title" ng-bind-html="options.title"></h4></div><div class="modal-body"><h4 ng-bind-html="options.heading"></h4><p ng-bind-html="options.description"></p></div><div class="modal-footer"><button type="button" class="btn btn-primary" ng-click="$hide()">{{options.okButtonText}}</button></div></div></div></div>');
$templateCache.put('confirm.html','<div class="modal" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" ng-click="$hide()">&times;</button><h4 class="modal-title" ng-bind-html="options.title"></h4></div><div class="modal-body"><h4 ng-bind-html="options.heading"></h4><p ng-bind-html="options.description"></p></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="answer(false)">{{options.cancelButtonText}}</button> <button type="button" class="btn btn-primary" ng-click="answer(true)">{{options.okButtonText}}</button></div></div></div></div>');
$templateCache.put('prompt.html','<div class="modal" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" ng-click="$hide()">&times;</button><h4 class="modal-title" ng-bind-html="options.title"></h4></div><div class="modal-body"><h4 ng-bind-html="options.heading"></h4><p ng-bind-html="options.description"></p><form name="promptDialogForm"><div class="form-group" ng-class="{ \'has-error\' : promptDialogForm.promptInput.$invalid && promptDialogForm.promptInput.$dirty }"><input type="text" class="form-control" required placeholder="{{options.placeholder}}" name="promptInput" id="promptInput" ng-required="true" ng-model="promptInput"><div class="help-block" ng-messages="promptDialogForm.promptInput.$error" ng-if="promptDialogForm.promptInput.$dirty && promptDialogForm.promptInput.$invalid"><p ng-message="required">This is required.</p></div></div></form></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="answer(false)">{{options.cancelButtonText}}</button> <button type="button" class="btn btn-primary" ng-disabled="promptDialogForm.$invalid" ng-click="answer(promptInput)">{{options.okButtonText}}</button></div></div></div></div>');}]);