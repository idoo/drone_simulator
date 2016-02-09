import isNumber from 'lodash';
const BOARD_SIZE = 5;
const INVALID_COORDINATES = 'Invalid Coordinates';

class Table {
  /**
   * Class constructor
   */
  constructor() {
    this.position = null;
  }

  /**
   * Set position
   * @param x [Number] X coordinate
   * @param y [Number] Y coordinate
   * @returns {null|{x: *, y: *}|*}
   */
  setPosition(x, y) {
    if (this.isValidCoordinates(x, y)) {
      this.position = {x: x, y: y};
    } else {
      throw new Error(INVALID_COORDINATES);
    }
    return this.position;
  }

  /**
   * Check table limits
   * @param x [Number] X coordinate
   * @param y [Number] Y coordinate
   * @returns {boolean}
   */
  isValidCoordinates(x, y) {
    return x >= 0 && x <= BOARD_SIZE - 1 && y >= 0 && y <= BOARD_SIZE - 1;
  }
}

export default Table;
