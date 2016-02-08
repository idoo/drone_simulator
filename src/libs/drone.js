import socketClient from 'socket.io-client';
//let machine = socketClient('http://localhost');

import Cylon from 'cylon';
const ROBOT_NAME = 'Blue';
const MODEL = 'bebop';
const SPEED = '0.1';
const DURATION = 2000;
class Drone {
  constructor() {
    this.drone = null;
  }

  start() {
    Cylon.robot({
      name: ROBOT_NAME,

      // These are the events that will be registered in the API
      events: ['taked_off', 'turned_off', 'stoped', 'moved', 'turned'],

      commands: function() {
        return {
          take_off: this.takeOff,
          land: this.land,
          stop: this.stop,
          move: this.move,
          left: this.left,
          right: this.right
        };
      },

      connections: {
        bebop: { adaptor: MODEL }
      },

      devices: {
        drone: { driver: MODEL }
      },

      takeOff() {
        this.drone.takeOff();
        this.emit('taked_off', { data: 'I can fly!'});
      },

      land() {
        this.drone.land();
        this.emit('landed', { data: 'Landed'});
      },

      move() {
        this.drone.forward(SPEED);
        setTimeout(function() {this.drone.forward(0);}, DURATION);
        this.emit('moved', { data: 'Let\'s go'});
      },

      left() {
        this.drone.counterClockwise(SPEED);
        setTimeout(function() {this.drone.counterClockwise(0);}, DURATION);
        this.emit('turned', { data: 'Let\'s go'});
      },

      right() {
        this.drone.clockwise(SPEED);
        setTimeout(function() {this.drone.clockwise(0);}, DURATION);
        this.emit('turned', { data: 'Let\'s go'});
      },

      place() {
        //  @TODO: place drone to custom coordinates
      }
    });

    Cylon.api('socketio', {host: '0.0.0.0', port: '3000'});
    Cylon.start();
  }

  connect() {
    this.drone = socketClient(`http://127.0.0.1:3000/api/robots/${ROBOT_NAME}`);

    this.drone.on('commands', function(commands) {
      console.log('Drone commands:', commands.toString());
    });

    this.drone.emit('commands');
  }

  run(command) {
    switch (command.split(' ')[0]) {
      case 'place' :
        this.drone.emit('take_off');
        break;
      case 'report' :
        this.drone.emit('land');
        break;
      default:
        this.drone.emit(command);
    }
  }
}

export default Drone;