import chai from 'chai';
import Control from '../src/libs/control';
let expect = chai.expect;

describe('Control', function () {
  describe('constructor', function () {
    it('should have table, robot props', function () {
      let control = new Control();
      expect(control.table).to.be.exist;
      expect(control.robot).to.be.exist;
    });
  });

  describe('#run', function () {
    it('should run commands', function () {
      let control = new Control();
      expect(control.run('PLACE 0,0,NORTH')).to.be.instanceof(Object);
    });

    it('should throw error when command is empty', function () {
      let control = new Control();
      expect(function () {
        control.run('');
      }).to.throw();
    });

    it('should return error string when position was not set', function () {
      let control = new Control();
      expect(control.run('LEFT')).to.eql('Please set position first!');
    });
  });

  describe('#executeCommand', function () {
    it('should execute correct command', function () {
      let control = new Control();
      let res = control.executeCommand('place', [0,0,'north']);

      //expect(res).to.be.instanceof(Function);
    });
  });

});