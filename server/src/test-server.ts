'use strict';

import WebSocket = require('ws');
import { sendJson, broadcast, tryParseJson } from "./basic";

//var port: number = process.env.PORT || 3000;
var port: number = 3005;
var WebSocketServer = WebSocket.Server;
var server = new WebSocketServer({ port: port });

var count = 0;

var ws_hardware = null;

// client connected to server
server.on('connection', (ws: WebSocket) => {

  // message recieved from client
  ws.on('message', (message: string) => {
    var data = tryParseJson(message);
    if(data == null){
      return;
    }
    if(data.action == null){
      return;
    }
    if(data.action == "register hardware"){
      if(data.token == "afafafafafa8"){
        console.log("hardware registered");
        ws_hardware = ws;
      }
    }
    if(data.action == "hardware touched"){
      if(data.token == "afafafafafa8"){
        console.log("hardware touched");
        count += 1;
        broadcast(server, {
          action: 'touched',
          count: count
        });
      }
    }
    if(data.action == "add task"){
      sendJson(ws_hardware, {
        action: "add task"
      })
    }
    if(data.action == "pill taken"){
      if(data.token == "afafafafafa8"){
        console.log("pill taken");
        count += 1;
        broadcast(server, {
          action: 'taken',
          count: count
        });
      }
    }
  });

  // client disconnected
  ws.on('disconnect', () => {
    console.log('Client disconnected');
  });

});

console.log('Test server is running on port', port);
