'use strict';

describe('Service: upVar', function () {

  // load the service's module
  beforeEach(module('fdjApp'));

  // instantiate service
  var upVar;
  beforeEach(inject(function (_upVar_) {
    upVar = _upVar_;
  }));

  it('should do something', function () {
    expect(!!upVar).toBe(true);
  });

});
