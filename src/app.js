'use strict';

angular.module('AngularAuth', ['ui.router', 'mm.foundation'])

  .run(['$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    }
  ])

  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/', '/home');
    $urlRouterProvider.when('', '/home');
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/views/home.html',
        controller: 'HomeCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: '/views/auth/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: '/views/auth/signup.html',
        controller: 'SignupCtrl'
      })
      .state('editProfile', {
        url: '/editprofile',
        templateUrl: '/views/auth/editprofile.html',
        controller: 'EditProfileCtrl'
      })
      .state('forgotPassword', {
        url: '/forgot',
        templateUrl: '/views/auth/forgotpassword.html',
        controller: 'ForgotPasswordCtrl'
      })
      .state('resetPassword', {
        url: '/resetpassword?token',
        templateUrl: '/views/auth/resetpassword.html',
        controller: 'ResetPasswordCtrl'
      });
  })
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($rootScope, $q, $window, $location) {
      return {
        request: function(config) {
          if ($window.localStorage.token) {
            config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
          }
          return config;
        },
        responseError: function(response) {
          if (response.status === 401) {
            // @TODO code repetition - Auth logout
            delete $window.localStorage.token;
            $rootScope.currentUser = null;
            $location.path('/login');
          }
          return $q.reject(response);
        }
      };
    });
  })
  .constant('apiUrl', 'http://localhost:5000')
  .constant('resetPasswordUrl', 'http://localhost:3000/#')
  .run(function ($rootScope) {
    // @TODO ?
    if ($rootScope.currentUser) {
      $rootScope.loggedin = true;
    }
  });

