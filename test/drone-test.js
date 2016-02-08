import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Drone from '../src/libs/drone';

let expect = chai.expect;
chai.use(sinonChai);

var Cylon = require('cylon');
Cylon.config({ testMode: true });

describe("Drone", function() {
  let drone = new Drone();

  it("should have start", function() {
    expect(drone.start).to.be.a('function');
  });

  //it("should toggle the LED after one second", function() {
  //  var led = robot.led,
  //    toggle = sinon.stub(led, 'toggle');
  //
  //  clock.tick(1000);
  //  expect(toggle).to.have.been.called;
  //});
});