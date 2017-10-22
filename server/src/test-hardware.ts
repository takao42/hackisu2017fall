import WebSocket = require('ws');

import { sendJson, waitForConnection } from "./basic";

var socket = new WebSocket('ws://10.27.175.147:3005');

waitForConnection(socket, start);

function start(){
  sendJson(socket, {
    action: "ajslkjdl"
  });
}
