import { head, last, isEmpty } from 'lodash'
import Table from './table';
import Robot from './robot';

const COMMANDS = ['place', 'move', 'left', 'right', 'report'];
const ERR_NO_COMMAND = 'Please type any command';
const ERR_NO_POSSITION = 'Please set position first!';
const ERR_INVALID_COMMAND = 'Invalid command';
const ERR_INVALID_POSITION = 'Invalid position or orientation';

class Control {
  /***
   * Class constructor
   */
  constructor() {
    this.table = new Table();
    this.robot = new Robot();
  }

  /***
   *
   * @param commandString [String] String with command for robot
   */
  run(commandString) {
    let commands, operator, position;
    commands = commandString.split(' ');
    operator = head(commands).toLowerCase();
    position = last(commands).split(',');

    if (isEmpty(commandString)) {
      throw new Error(ERR_NO_COMMAND);
    } else if (!this.table.position && operator != COMMANDS[0]) {
      return ERR_NO_POSSITION;
    }

    return this.executeCommand(operator, position);
  }

  /**
   *
   * @param command [String] Execute command for robot
   * @param position [Array] Execute command for robot
   */
  executeCommand(command, position) {
    switch (command) {
      case COMMANDS[0] :
        return this.place(position);
        break;
      case COMMANDS[1] :
        return this.move();
        break;
      case COMMANDS[2] :
        return this.left();
        break;
      case COMMANDS[3] :
        return this.right();
        break;
      case COMMANDS[4] :
        return this.report();
        break;
      default:
        throw new Error(ERR_INVALID_COMMAND);
    }
  }

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

  left() {
    try {
      let x, y;
      x = this.table.position.x;
      y = this.table.position.y;
      this.robot.turnLeft();

      return this._buildRespObject(x, y, this.robot.direction);
    } catch (err) {
      throw new Error(ERR_INVALID_COMMAND);
    }
  }

  right() {
    try {
      let x, y;
      x = this.table.position.x;
      y = this.table.position.y;
      this.robot.turnRight();

      return this._buildRespObject(x, y, this.robot.direction);
    } catch (err) {
      throw new Error(ERR_INVALID_COMMAND);
    }
  }

  report() {
    let orientation, position;
    position = this.table.position;
    orientation = this.robot.direction;

    return this._buildRespObject(position.x, position.y, orientation);
  }

  _buildRespObject(x, y, orientation) {
    return {
      msg: `Robot set to ${x},${y} front to ${orientation}`,
      orientation: orientation,
      x: x,
      y: y
    }
  }
}

export default Control;