'use strict';

describe('Controller: ReclamationCtrl', function () {

  // load the controller's module
  beforeEach(module('fdjApp'));

  var ReclamationCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReclamationCtrl = $controller('ReclamationCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
