'use strict';

angular.module('pilgrimApp')
  .controller('MainCtrl', function ($scope, $http, socket, uiGmapGoogleMapApi) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function (awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function () {
      if ($scope.newThing === '') { return; }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function (thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    $scope.logs = [];

    $http.get('/api/log/all').success(function (logs) {
      $scope.logs = logs;
      socket.syncUpdates('log', $scope.logs, function (event, log, logs) {
        if (event === 'created') { $scope.logs = logs; }
      });
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('log');
    });

    $scope.map = {
      center: [6.8697, 45.9231],
      zoom: 10,
      options: {
        streetViewControl: false
      }
    };

    $scope.markers = {
      options: {}
    };

    $scope.windows = {
      options: {}
    };

    uiGmapGoogleMapApi.then(function (maps) {
      $scope.map.options.mapTypeId = google.maps.MapTypeId.TERRAIN;
      $scope.markers.options.animation = google.maps.Animation.DROP;
    });
  });
