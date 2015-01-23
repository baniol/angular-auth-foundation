'use strict';

angular.module('AngularAuth')
  .controller('ResetPasswordCtrl', function ($scope, $location, Auth, $message, $state) {
    $scope.resetPassword = function () {
      var token = $state.params.token;
      if (!token) {
        $message('No reset token provided');
        return;
      }
      // @TODO a separate directive
      $scope.inProgress = true;
      Auth.resetPassword(token, $scope.password)
        .success(function () {
          $location.path('/login');
          // @TODO a separate directive
          $scope.inProgress = false;
          $message('You can now log in with the new password.');
        })
        .error(function() {
          // @TODO a separate directive
          $scope.inProgress = false;
          $message('Error reseting password!');
        });
    };
  });
