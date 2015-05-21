'use strict';

describe('Controller: IndicateursClefsCtrl', function () {

  // load the controller's module
  beforeEach(module('fdjApp'));

  var IndicateursClefsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IndicateursClefsCtrl = $controller('IndicateursClefsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
