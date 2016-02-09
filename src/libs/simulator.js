import { head, last, isEmpty } from 'lodash';
import Table from './table';
import Robot from './robot';

const COMMANDS = ['place', 'move', 'left', 'right', 'report'];
const ERR_NO_COMMAND = 'Please type any command';
const ERR_NO_POSSITION = 'Please set position first!';
const ERR_INVALID_COMMAND = 'Invalid command';
const ERR_INVALID_POSITION = 'Invalid position or orientation';
const ERR_WRONG = 'Something went wrong';

class Simulator {
  /***
   * Class constructor
   */
  constructor() {
    this.table = new Table();
    this.robot = new Robot();
  }

  /***
   * Run robot command
   * @param commandString [String] String with command for robot
   */
  run(commandString) {
    const commands = commandString.split(' ');
    const operator = head(commands).toLowerCase();
    const position = last(commands).split(',');

    if (isEmpty(commandString)) {
      throw new Error(ERR_NO_COMMAND);
    } else if (!this.table.position && operator !== COMMANDS[0]) {
      return ERR_NO_POSSITION;
    }

    return this.executeCommand(operator, position);
  }

  /**
   * Execute robot command
   * @param command [String] Command for robot
   * @param position [Array] Position for robot
   */
  executeCommand(command, position) {
    switch (command) {
      case COMMANDS[0] :
        return this.place(position);
      case COMMANDS[1] :
        return this.move();
      case COMMANDS[2] :
        return this.left();
      case COMMANDS[3] :
        return this.right();
      case COMMANDS[4] :
        return this.report();
      default:
        throw new Error(ERR_INVALID_COMMAND);
    }
  }

  /***
   * Place robot to position
   * @param position [Array] Robot position
   * @returns {{msg, orientation, x, y}|*}
   */
  place(position) {
    let orientation, x, y;
    try {
      orientation = last(position);
      x = parseInt(position[0]);
      y = parseInt(position[1]);
      this.robot.setOrientation(orientation);
      this.table.setPosition(x, y);

      return this._buildRespObject(x, y, orientation);
    }
    catch (err) {
      throw new Error(ERR_INVALID_POSITION);
    }
  }

  /***
   * Move robot 1 step
   * @returns {{msg, orientation, x, y}|*}
   */
  move() {
    let step, x, y;
    try {
      step = this.robot.move();
      x = this.table.position.x + step.x;
      y = this.table.position.y + step.y;
      this.table.setPosition(x, y);
      return this._buildRespObject(x, y, this.robot.direction);
    } catch (err) {
      throw new Error(ERR_INVALID_POSITION);
    }
  }

  /***
   * Turn robot left
   * @returns {{msg, orientation, x, y}|*}
   */
  left() {
    try {
      let x, y;
      x = this.table.position.x;
      y = this.table.position.y;
      this.robot.turnLeft();

      return this._buildRespObject(x, y, this.robot.direction);
    } catch (err) {
      throw new Error(ERR_WRONG);
    }
  }

  /***
   * Turn robot right
   * @returns {{msg, orientation, x, y}|*}
   */
  right() {
    try {
      let x, y;
      x = this.table.position.x;
      y = this.table.position.y;
      this.robot.turnRight();

      return this._buildRespObject(x, y, this.robot.direction);
    } catch (err) {
      throw new Error(ERR_WRONG);
    }
  }

  /***
   * Report current position
   * @returns {{msg, orientation, x, y}|*}
   */
  report() {
    let orientation, position;
    position = this.table.position;
    orientation = this.robot.direction;

    return this._buildRespObject(position.x, position.y, orientation);
  }

  /***
   * Create object with current robot position
   * @param x [Number] X coordinate
   * @param y [Number] Y coordinate
   * @param orientation [String] Orientation
   * @returns {{msg: *, orientation: *, x: *, y: *}}
   * @private
   */
  _buildRespObject(x, y, orientation) {
    return {
      msg: `Robot set to ${x},${y},${orientation}`,
      orientation: orientation,
      x: x,
      y: y
    };
  }
}

export default Simulator;