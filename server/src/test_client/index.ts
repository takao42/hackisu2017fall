'use strict';

import WebSocket = require('ws');
import { tryConnect, sendJson, broadcast, tryParseJson, waitForConnection } from "../basic";

var ls_gs = new WebSocket('ws://localhost:3002');
ls_gs.onerror = function(event){
  console.log('Server is down');
  process.exit(); // end server
}
ls_gs.onmessage = function(msg){
  console.log(msg.data);
}
waitForConnection(ls_gs, start);

function start(){
  sendJson(ls_gs, {
    action: 'login',
    username: 'user1',
    password: 'pass1'
  });
}


