import chai from 'chai';
import Table from '../src/libs/table';
let expect = chai.expect;

describe('Table', function () {
  describe('constructor', function () {
    it('should have default null position', function () {
      let table = new Table();
      expect(table.position).to.be.null;
    });
  });

  describe('#isValidCoordinates', function () {
    it('should return false if X coordinates not a number', function () {
      let res = (new Table()).isValidCoordinates('foo', 1);
      expect(res).to.be.false;
    });
    it('should return false if Y coordinates not a number', function () {
      let res = (new Table()).isValidCoordinates(1, 'foo');
      expect(res).to.be.false;
    });
    it('should return false if Y coordinates more than limit', function () {
      let res = (new Table()).isValidCoordinates(4, 5);
      expect(res).to.be.false;
    });
    it('should return false if X coordinates more than limit', function () {
      let res = (new Table()).isValidCoordinates(5, 4);
      expect(res).to.be.false;
    });
    it('should return true if X and Y less than limit', function () {
      let res = (new Table()).isValidCoordinates(4, 4);
      expect(res).to.be.true;
    });
    it('should return true if X and Y coordinates starts from 0', function () {
      let res = (new Table()).isValidCoordinates(0, 0);
      expect(res).to.be.true;
    });
  });

  describe('#setPosition', function () {
    it('should return true, and update position', function () {
      let table, res;
      table = new Table();
      res = table.setPosition(4, 4);
      expect(res).to.be.true;
      expect(table.position).to.eql({x: 4, y: 4});
    });

    it('should throw Error with invalid coordinates', function () {
      let table = new Table();
      expect(function () {
        table.setPosition(5, 5);
      }).to.throw();
    });
  });
});