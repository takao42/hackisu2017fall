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
    console.log(data);
    if(data == null){
      return;
    }
    if(data.action == null){
      return;
    }
    if(data.action == "register hardware"){
      if(data.token == "afafafafafa8"){
        ws_hardware = ws;
      }
    }
    else if(data.action == "hardware touched"){
      if(data.token == "afafafafafa8"){
        count += 1;
        broadcast(server, {
          action: 'touched',
          count: count
        });
      }
    }
    else if(data.action == "add task"){
      if(data.token == "webui"){
        sendJson(ws_hardware, {
          action: "add task"
        });
        broadcast(server, {
          action: 'task added',
          count: count+1
        })
      }
    }
    else if(data.action == "cancel task"){
      if(data.token == "webui"){
        sendJson(ws_hardware, {
          action: "cancel task"
        });
      }
    }
    else if(data.action == "pill taken"){
      if(data.token == "afafafafafa8"){
        count += 1;
        broadcast(server, {
          action: 'pill taken',
          count: count
        });
      }
    }
    else if(data.action == "task cancelled"){
      if(data.token == "afafafafafa8"){
        broadcast(server, {
          action: 'task cancelled'
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
