import isNumber from 'lodash';
const BOARD_SIZE = 5;
const INVALID_COORDINATES = 'Invalid Coordinates';

class Table {
  constructor() {
    this.position = null;
  }

  setPosition(x, y) {
    if (this.isValidCoordinates(x, y)) {
      this.position = {x: x, y: y};
      return true;
    } else {
      throw new Error(INVALID_COORDINATES);
    }
  }

  isValidCoordinates(x, y) {
    return isNumber(x) && isNumber(y) &&
      x >= 0 && x <= BOARD_SIZE - 1 && y >= 0 && y <= BOARD_SIZE - 1;
  }
}

export default Table;
