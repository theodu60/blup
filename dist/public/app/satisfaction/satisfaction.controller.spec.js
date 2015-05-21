'use strict';

describe('Controller: SatisfactionCtrl', function () {

  // load the controller's module
  beforeEach(module('fdjApp'));

  var SatisfactionCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SatisfactionCtrl = $controller('SatisfactionCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
