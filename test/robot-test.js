import chai from 'chai';
import Robot from '../src/libs/robot';
let expect = chai.expect;

describe('Robot', function () {
  describe('constructor', function () {
    it('should have default null direction', function () {
      let robot = new Robot();
      expect(robot.direction).to.be.null;
    });
  });

  describe('#kill', function () {
    it('should tell about first law of robotics', function () {
      let robot = new Robot();
      expect(function () {
        robot.kill('human');
      }).to.throw();
    });
  });

  describe('#setOrientation', function() {
    it('should set direction', function () {
      let robot = new Robot();
      robot.setOrientation('north');
      expect(robot.direction).to.eql('north');
    });

    it('should set null, when orientation is invalid', function () {
      let robot = new Robot();
      robot.setOrientation('foo');
      expect(robot.direction).to.be.null;
    });
  });

  describe('#turnLeft', function() {
    it('should turn left', function () {
      let robot = new Robot();
      robot.direction = 'north';
      robot.turnLeft();
      expect(robot.direction).to.eql('west');
      robot.turnLeft();
      expect(robot.direction).to.eql('south');
      robot.turnLeft();
      expect(robot.direction).to.eql('east');
      robot.turnLeft();
      expect(robot.direction).to.eql('north');
    });

    it('should throw error when orientation was not set', function() {
      let robot = new Robot();
      expect(function () {
        robot.turnLeft();
      }).to.throw();
    });
  });

  describe('#turnRight', function() {
    it('should turn right', function () {
      let robot = new Robot();
      robot.direction = 'north';
      robot.turnRight();
      expect(robot.direction).to.eql('east');
      robot.turnRight();
      expect(robot.direction).to.eql('south');
      robot.turnRight();
      expect(robot.direction).to.eql('west');
      robot.turnRight();
      expect(robot.direction).to.eql('north');
    });

    it('should throw error when orientation was not set', function() {
      let robot = new Robot();
      expect(function () {
        robot.turnRight();
      }).to.throw();
    });
  });

  describe('#move', function() {
    it('should move to north', function () {
      let robot = new Robot();
      robot.direction = 'north';
      expect(robot.move()).to.eql({x: 0, y: 1});
    });

    it('should move to south', function () {
      let robot = new Robot();
      robot.direction = 'south';
      expect(robot.move()).to.eql({x: 0, y: -1});
    });

    it('should move to east', function () {
      let robot = new Robot();
      robot.direction = 'east';
      expect(robot.move()).to.eql({x: 1, y: 0});
    });

    it('should move to west', function () {
      let robot = new Robot();
      robot.direction = 'west';
      expect(robot.move()).to.eql({x: -1, y: 0});
    });
  });
});