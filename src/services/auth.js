'use strict';

angular.module('AngularAuth')
  .factory('Auth', function ($http, $rootScope, $window, apiUrl, resetPasswordUrl) {

    var token = $window.localStorage.token;
    if (token) {
      try {
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        $rootScope.currentUser = payload.user;
        $rootScope.loggedin = true;
      }
      catch (e) {
        console.log(e);
      }
    }

    var saveToken = function (token) {
      $window.localStorage.token = token;
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      $rootScope.currentUser = payload.user;
    };

    return {
      login: function(user) {
        return $http.post(apiUrl + '/login', user)
          .success(function(data) {
            saveToken(data.token);
          })
          .error(function() {
            delete $window.localStorage.token;
          });
      },
      signup: function(user) {
        return $http.post(apiUrl + '/signup', user)
          .success(function (res) {
            saveToken(res.token);
          });
      },
      logout: function() {
        delete $window.localStorage.token;
        $rootScope.currentUser = null;
      },
      editProfile: function (user) {
        return $http.post(apiUrl + '/editprofile/', user)
          .success(function (res) {
            if (res.msg !== 'Data not modified') {
              saveToken(res.token);
            }
          });
      },
      checkAuth: function() {
        return $http.post(apiUrl + '/checkauth');
      },
      forgotPassword: function (email) {
        var data = {url: resetPasswordUrl, email: email};
        return $http.post(apiUrl + '/remindpassword/', data);
      },
      resetPassword: function (token, password) {
        var data = {token: token, password: password};
        return $http.post(apiUrl + '/resetpassword/', data);
      },
      removeAccount: function () {
        // @TODO success + error
        return $http.post(apiUrl + '/removeaccount/');
      },
      keepAlive: function () {
        return $http.post(apiUrl + '/keepalive/')
          .success(function (res) {
            saveToken(res.token);
          });
      }
    };
  });
