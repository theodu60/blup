'use strict';

describe('Controller: CanalCtrl', function () {

  // load the controller's module
  beforeEach(module('fdjApp'));

  var CanalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CanalCtrl = $controller('CanalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
