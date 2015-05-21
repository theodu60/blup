'use strict';

describe('Controller: PriseCtrl', function () {

  // load the controller's module
  beforeEach(module('fdjApp'));

  var PriseCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PriseCtrl = $controller('PriseCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
