'use strict';
angular.module('AngularAuth')
  .controller('NavbarCtrl', function($rootScope, $scope, $message, $location, Auth) {

    $scope.logout = function() {
      $rootScope.loggedin = false;
      Auth.logout();
      $location.path('/login');
      $message('You have been logged out.');
    };

  });
