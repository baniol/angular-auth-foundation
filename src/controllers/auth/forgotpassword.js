'use strict';

angular.module('AngularAuth')
  .controller('ForgotPasswordCtrl', function($scope, Auth, $message, $parse) {
    $scope.sendEmail = function() {
      // @TODO a separate directive
      $scope.inProgress = true;
      $scope.mailSent = false;
      Auth.forgotPassword($scope.email)
      .success(function () {
        // @TODO a separate directive
        $scope.inProgress = false;
        $message('Password sent');
        $scope.mailSent = true;
        // $location.path('/login');
      })
      .error(function (err) {
        // @TODO a separate directive
        $scope.inProgress = false;
        //$message(err[0].msg);
        for(var field in err) {
          var el = err[field];
          var serverMessage = $parse('forgotForm.'+el.param+'.$error.server');
          $scope.forgotForm[el.param].$setValidity('server', false);
          serverMessage.assign($scope, el.msg);
        }
      });
    };

    $scope.keyPress = function() {
      if ($scope.forgotForm.$invalid) {
        $scope.forgotForm.email.$setValidity('server', true);
      }
    };

    $scope.pageClass = 'fadeZoom';
  });
