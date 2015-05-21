'use strict';

describe('Service: upThis', function () {

  // load the service's module
  beforeEach(module('fdjApp'));

  // instantiate service
  var upThis;
  beforeEach(inject(function (_upThis_) {
    upThis = _upThis_;
  }));

  it('should do something', function () {
    expect(!!upThis).toBe(true);
  });

});
