import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Simulator from '../src/libs/simulator';

let expect = chai.expect;
chai.use(sinonChai);

describe('Simulator', function () {
  describe('constructor', function () {
    it('should have table, robot props', function () {
      let simulator = new Simulator();
      expect(simulator.table).to.be.exist;
      expect(simulator.robot).to.be.exist;
    });
  });

  describe('#run', function () {
    it('should run commands', function () {
      let simulator = new Simulator();
      expect(simulator.run('PLACE 0,0,NORTH')).to.be.instanceof(Object);
    });

    it('should throw error when command is empty', function () {
      let simulator = new Simulator();
      expect(function () {
        simulator.run('');
      }).to.throw();
    });

    it('should return error string when position was not set', function () {
      let simulator = new Simulator();
      expect(simulator.run('LEFT')).to.eql('Please set position first!');
    });
  });

  describe('#executeCommand', function () {
    it('should execute place command', function () {
      let simulator = new Simulator();
      let place = sinon.stub(simulator, 'place');
      simulator.executeCommand('place', [0, 0, 'north']);
      expect(place).to.have.been.called;
    });

    it('should execute move command', function () {
      let simulator = new Simulator();
      let move = sinon.stub(simulator, 'move');
      simulator.executeCommand('move');
      expect(move).to.have.been.called;
    });

    it('should execute left command', function () {
      let simulator = new Simulator();
      let left = sinon.stub(simulator, 'left');
      simulator.executeCommand('left');
      expect(left).to.have.been.called;
    });

    it('should execute right command', function () {
      let simulator = new Simulator();
      let right = sinon.stub(simulator, 'right');
      simulator.executeCommand('right');
      expect(right).to.have.been.called;
    });

    it('should execute report command', function () {
      let simulator = new Simulator();
      let report = sinon.stub(simulator, 'report');
      simulator.executeCommand('report');
      expect(report).to.have.been.called;
    });

    it('should throw error when command is invalid', function () {
      let simulator = new Simulator();
      expect(function () {
        simulator.executeCommand('foo');
      }).to.throw();
    });
  });

  describe('#place', function () {
    it('should place robot', function () {
      let simulator = new Simulator();
      let orientation = 'north';
      let x = 0, y = 0;

      simulator.place([x, y, orientation]);
      expect(simulator.robot.direction).to.eql(orientation);
      expect(simulator.table.position).to.eql({x: x, y: y});
    });
  });

  describe('#move', function () {
    it('should move robot', function () {
      let simulator = new Simulator();
      simulator.robot.direction = 'north';
      simulator.table.position = {x: 0, y: 0};
      simulator.move();
      expect(simulator.table.position).to.eql({x: 0, y: 1});
    });
  });

  describe('#left', function () {
    it('should turn left robot', function () {
      let simulator = new Simulator();
      simulator.table.position = {x: 0, y: 0};
      simulator.robot.direction = 'north';
      simulator.left();
      expect(simulator.robot.direction).to.eql('west');
    });
  });

  describe('#right', function () {
    it('should turn right robot', function () {
      let simulator = new Simulator();
      simulator.table.position = {x: 0, y: 0};
      simulator.robot.direction = 'west';
      simulator.right();
      expect(simulator.robot.direction).to.eql('north');
    });
  });

  describe('#report', function () {
    it('should call build method', function () {
      let simulator, x, y, orientation;
      simulator = new Simulator();
      x = 0; y = 0; orientation = 'west';
      simulator.table.position = {x: x, y: y};
      simulator.robot.direction = orientation;

      let _build = sinon.stub(simulator, '_buildRespObject');
      simulator.report();
      expect(_build).to.have.been.called;
    });
  });

  describe('#_buildRespObject', function () {
    it('should return correct data', function () {
      let simulator, x, y, orientation;
      simulator = new Simulator();
      x = 0;
      y = 0;
      orientation = 'west';

      let resp = {
        msg: `Robot set to ${x},${y} front to ${orientation}`,
        orientation: orientation,
        x: x,
        y: y
      };

      expect(simulator._buildRespObject(x, y, orientation)).to.eql(resp);
    });
  });


});