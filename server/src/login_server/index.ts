'use strict';

import WebSocket = require('ws');
import { Message } from "./model";
import { User } from "./model";
import { UserManager } from "./db-management";

// game server websocket
var ws_gs = new WebSocket('ws://localhost:3001');
ws_gs.onerror = function(event){
    console.log('Start the game server first!');
    process.exit(); // end server
}

var port: number = 3002;
var WebSocketServer = WebSocket.Server;
var server = new WebSocketServer({ port: port });
var userManager = new UserManager();

// client connected to server
server.on('connection', (ws: WebSocket) => {

  // message recieved from client
	ws.on('message', (message: string) => {
    var msg = JSON.parse(message);

    // check if action exists
    if (!('action' in msg)) {
      sendJson(ws, {
        action: null, 
        status: 'error', 
        reason: 'no action'
      });
      return;
    }

    // signup request from client
    if(msg.action == 'signup') {
      // check if name and password exist
      if (!('name' in msg) || !('password' in msg)) {
        sendJson(ws, {
          action: 'signup', 
          status: 'error', 
          reason: 'no name or password'
        });
        return;
      }

      userManager.signupUser(msg.name, msg.password).then((result) => {
        if(result.status == 'ok'){
          sendJson(ws, result);
          console.log('ls: \''+msg.name+'\' registered');
        } else {
          sendJson(ws, result);
        }
      });
    
    }

    // login request from client
    else if(msg.action == 'login'){
      // check if name and password keys exist
      if (!('name' in msg) || !('password' in msg)) {
        sendJson(ws, {
          action: 'login', 
          status: 'error', 
          reason: 'no name or password'
        });
        return;
      }

      userManager.loginUser(msg.name, msg.password).then((result) => {
        if(result.status == 'ok'){
          let resultToServer = result;
          resultToServer['server_token'] = 'j87s98dhfsa0shds0sfsh';
          // send result to game server
          sendJson(ws_gs, result);
          // send result back to client
          sendJson(ws, result);
          console.log('ls: \''+result.user_name+'\' logged in');
        } else { 
          sendJson(ws, result);
        }
      });
    }
	});


  // client disconnected
  ws.on('disconnect', () => {
      console.log('Client disconnected');
  });

});

function sendJson(ws, data){
  ws.send(JSON.stringify(data));
}


console.log('Login server (ls) is running on port', port);
