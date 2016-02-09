import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Drone from '../src/libs/drone';

let expect = chai.expect;
chai.use(sinonChai);

describe("Drone", function() {
  it("should have default machine", function() {
    let drone = new Drone();
    expect(drone.machine).to.be.null;
  });

  it("should have start", function() {
    let drone = new Drone();
    expect(drone.start).to.be.a('function');
  });

  it("should can run command", function() {
    let drone = new Drone();
    expect(drone.run).to.be.a('function');
  });
});