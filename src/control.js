const DEV_MODE = true;

import clc from 'cli-color';
import rl from './libs/interface';
import {isEmpty} from 'lodash';
import Simulator from './libs/simulator';
import Drone from './libs/drone';
const warn = clc.red.bold;
const notice = clc.blue.italic;
let simulator, drone;

(function startMachine() {
  if (!DEV_MODE) {
    drone = (new Drone()).start();
    _showDroneNotice();
  } else {
    simulator = new Simulator();
  }
})();

(function askCommand() {
  rl.question('Please input command for robot:', function (command) {
    if (!isEmpty(command)) {
      console.info(notice(`Command is: '${warn(command)}' executing...`));
      _executeCommand(command);
    }
    askCommand();
  });
})();


function _executeCommand(command) {
  let resp;

  if (DEV_MODE) {
    resp = simulator.run(command);
    console.log(resp.msg);
  } else {
    drone.run(command);
  }
}

function _showDroneNotice() {
  console.info(warn('************************************************'));
  console.info(warn('*  Command `stop` or `report` will land drone  *'));
  console.info(warn('************************************************'));
}