'use strict';

describe('Service: CordovaReady', function () {

  // load the service's module
  beforeEach(module('fadboardAppApp'));

  // instantiate service
  var CordovaReady;
  beforeEach(inject(function (_CordovaReady_) {
    CordovaReady = _CordovaReady_;
  }));

  it('should do something', function () {
    expect(!!CordovaReady).toBe(true);
  });

});
