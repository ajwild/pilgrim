'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('pilgrimApp'));
  beforeEach(module('socketMock'));

  var MainCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);
    $httpBackend.expectGET('/api/log/all')
      .respond([{id: 0, latitude: 0, longitude: 0}, {id: 1, latitude: 1, longitude: 1}]);

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of things to the scope', function () {
    $httpBackend.flush();
    expect(scope.awesomeThings.length).toBe(4);
  });

  it('should attach a list of markers to the scope', function () {
    $httpBackend.flush();
    expect(scope.logs.length).toBe(2);
  });
});
