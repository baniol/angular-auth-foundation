'use strict';

angular.module('AngularAuth')
  .factory('$message', function() {
    var a = function (msg) {
      $('body').append('<div class="notification">'+msg+'</div>');
      setTimeout(function () {
        angular.element('.notification').remove();
      }, 2000);
    };
    return a;
  });
