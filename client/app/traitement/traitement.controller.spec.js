'use strict';

describe('Controller: TraitementCtrl', function () {

  // load the controller's module
  beforeEach(module('fdjApp'));

  var TraitementCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TraitementCtrl = $controller('TraitementCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
