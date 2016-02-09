import  { includes } from 'lodash';
const ORIENTATIONS = ['north', 'south', 'east', 'west'];
const FIRST_LAW_OF_ROBOTICS = 'A robot may not injure a human being or, ' +
  'through inaction, allow a human being to come to harm.';

class Robot {
  constructor() {
    this.direction = null;
  }

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

  setOrientation(orientation) {
    this.direction = (includes(ORIENTATIONS, orientation)) ? orientation : null;
  }

  turnLeft() {
    switch (this.direction) {
      case ORIENTATIONS[0] :
        this.direction = ORIENTATIONS[3];
        break;
      case ORIENTATIONS[1] :
        this.direction = ORIENTATIONS[2];
        break;
      case ORIENTATIONS[2] :
        this.direction = ORIENTATIONS[0];
        break;
      case ORIENTATIONS[3] :
        this.direction = ORIENTATIONS[1];
        break;
      default :
        this.showOrientationError();
    }
  }

  turnRight() {
    switch (this.direction) {
      case ORIENTATIONS[0] :
        this.direction = ORIENTATIONS[2];
        break;
      case ORIENTATIONS[1] :
        this.direction = ORIENTATIONS[3];
        break;
      case ORIENTATIONS[2] :
        this.direction = ORIENTATIONS[1];
        break;
      case ORIENTATIONS[3] :
        this.direction = ORIENTATIONS[0];
        break;
      default :
        this.showOrientationError();
    }
  }

  move() {
    switch (this.direction) {
      case ORIENTATIONS[0] :
        return {x: 0, y: 1};
      case ORIENTATIONS[1] :
        return {x: 0, y: -1};
      case ORIENTATIONS[2] :
        return {x: 1, y: 0};
      case ORIENTATIONS[3] :
        return {x: -1, y: 0};
      default :
        this.showOrientationError();
    }
  }

  firstLawOfRobotics() {
    throw new Error(FIRST_LAW_OF_ROBOTICS);
  }

  showOrientationError(orientation) {
    throw new Error(`Invalid orientation: ${orientation}`);
  }
}

export default Robot;