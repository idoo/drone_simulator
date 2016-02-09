import bebop from 'node-bebop';
const SPEED = 25;

class Drone {
  /**
   * Class constructor
   */
  constructor() {
    this.machine = null;
  }

  /**
   * Connect to drone
   */
  start() {
    this.machine = bebop.createClient();
    this.machine.connect();
  }

  /**
   * Run robot command
   * @param command
   */
  run(command) {
    let machine;
    machine = this.machine;

    switch (command.split(' ')[0]) {
      case 'place' :
        machine.takeOff();
        break;
      case 'move' :
        machine.forward(SPEED);
        break;
      case 'left' :
        machine.counterClockwise(SPEED);
        break;
      case 'right' :
        machine.clockwise(SPEED);
        break;
      case 'kill' :
        machine.frontFlip(SPEED);
        break;
      case 'report' :
        machine.land();
        break;
      case 'stop' :
        machine.land();
        break;
      default:
        machine.land();
    }
  }
}

export default Drone;