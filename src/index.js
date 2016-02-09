import clc from 'cli-color';
import readline from 'readline';
import {isEmpty} from 'lodash';
import Simulator from './libs/simulator';
import Drone from './libs/drone';

const DEV_MODE = false;

const AVAILABLE_COMMANDS =
  'Available commands is: PLACE, MOVE, LEFT, RIGHT, REPORT';
const warn = clc.red.bold;
const notice = clc.blue.italic;

let simulator, drone, rl;
rl = readline.createInterface(process.stdin, process.stdout);
simulator = new Simulator();

console.info(warn('******************************************'));
console.info(warn('*  Command `stop` will switch off robot  *'));
console.info(warn('******************************************'));

(function startMachine() {
  if (!DEV_MODE) {
    drone = new Drone();
    drone.start();
    drone.connect();
  }
})(this);

(function askCommand() {
  rl.question('Please input command for robot:', function (command) {
    if (!isEmpty(command)) {
      console.info(notice(`Command is: '${warn(command)}' executing...`));
      executeCommand(command);
    } else {
      stopMachine();
    }
    askCommand();
  });
})(this);




function executeCommand(command) {
  if (DEV_MODE) {
    let resp = simulator.run(command);
    console.log(resp.msg);
  } else {
    drone.run(command);
  }
}

function stopMachine() {
  console.info(notice(AVAILABLE_COMMANDS));
  rl.close();
  process.stdin.destroy();

  if (!DEV_MODE) {
    drone.run('land');
  }
}