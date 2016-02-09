import  { includes } from 'lodash';
const NORTH = 'north';
const SOUTH = 'south';
const EAST = 'east';
const WEST = 'west';
const ORIENTATIONS = [NORTH, SOUTH, EAST, WEST];
const FIRST_LAW_OF_ROBOTICS = 'A robot may not injure a human being or, ' +
  'through inaction, allow a human being to come to harm.';

class Robot {
  /***
   * Class constructor
   */
  constructor() {
    this.direction = null;
  }

  /**
   * Kill target
   * @param target [String] target
   */
  kill(target) {
    switch (target) {
      case 'human' :
        this.firstLawOfRobotics();
        break;
      default :
        // @TODO: Perhaps, need to teach the robot to kill
        return;
    }
  }

  /***
   * Set robot orientation
   * @param orientation [String] Orientation
   */
  setOrientation(orientation) {
    this.direction = (includes(ORIENTATIONS, orientation)) ? orientation : null;
  }

  /***
   * Turn robot left
   */
  turnLeft() {
    switch (this.direction) {
      case NORTH :
        this.direction = WEST;
        break;
      case SOUTH :
        this.direction = EAST;
        break;
      case EAST :
        this.direction = NORTH;
        break;
      case WEST :
        this.direction = SOUTH;
        break;
      default :
        this.showOrientationError();
    }
  }

  /***
   * Turn robot right
   */
  turnRight() {
    switch (this.direction) {
      case NORTH :
        this.direction = EAST;
        break;
      case SOUTH :
        this.direction = WEST;
        break;
      case EAST :
        this.direction = SOUTH;
        break;
      case WEST :
        this.direction = NORTH;
        break;
      default :
        this.showOrientationError();
    }
  }

  /**
   * Move robot to 1 step
   * @returns {{x: number, y: number}}
   */
  move() {
    switch (this.direction) {
      case NORTH :
        return {x: 0, y: 1};
      case SOUTH :
        return {x: 0, y: -1};
      case EAST :
        return {x: 1, y: 0};
      case WEST :
        return {x: -1, y: 0};
      default :
        this.showOrientationError();
    }
  }

  /**
   * Show first law of robotics
   */
  firstLawOfRobotics() {
    throw new Error(FIRST_LAW_OF_ROBOTICS);
  }

  /***
   * Show error about invalid orientation
   * @param orientation
   */
  showOrientationError(orientation) {
    throw new Error(`Invalid orientation: ${orientation}`);
  }
}

export default Robot;