'use strict';

import WebSocket = require('ws');
import { sendJson, broadcast, tryParseJson, waitForConnection } from "../basic";

// game server websocket
var ws_gs = new WebSocket('ws://localhost:3001');
ws_gs.onerror = function(event){
    console.log('Game server is down');
    process.exit(); // end server
}

waitForConnection(ws_gs, start);

function start(){
  sendJson(ws_gs, "afa");
  sendJson(ws_gs, {action:"afa"});
}

ws_gs.onmessage = function(msg){
  console.log(msg.data);
}
