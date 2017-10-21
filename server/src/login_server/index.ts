'use strict';

import WebSocket = require('ws');
import { Message } from "../model";
import { LoggedInUserManager } from "./db-management";
import { sendJson, broadcast, tryParseJson } from "../basic";

// game server websocket
var ws_gs = new WebSocket('ws://localhost:3001');
ws_gs.onerror = function(event){
    console.log('Start the game server first!');
    process.exit(); // end server
}

var port: number = 3002;
var WebSocketServer = WebSocket.Server;
var server = new WebSocketServer({ port: port });
var userManager = new LoggedInUserManager();

// client connected to server
server.on('connection', (ws: WebSocket) => {

  // message recieved from client
	ws.on('message', (message: string) => {
    var recvData = tryParseJson(message);

    if(recvData == null){
      // recieved data is broken
      sendJson(ws, {
        action: null, 
        status: 'error', 
        reason: 'broken JSON data'
      });
      return;
    }

    // signup request from client
    if(recvData.action == 'signup') {
      // check if name and password exist
      if (!('username' in recvData) || !('password' in recvData)) {
        sendJson(ws, {
          action: 'signup', 
          status: 'error', 
          reason: 'no name or password'
        });
        return;
      }

      userManager.signupUser(recvData.name, recvData.password).then((result) => {
        if(result.status == 'ok'){
          sendJson(ws, result);
          console.log('ls: \''+recvData.name+'\' registered');
        } else {
          sendJson(ws, result);
        }
      });
    
    }
    // login request from client
    else if(recvData.action == 'login'){
      // check if name and password keys exist
      if (!('username' in recvData) || !('password' in recvData)) {
        sendJson(ws, {
          action: 'login', 
          status: 'error', 
          reason: 'no name or password'
        });
        return;
      }

      userManager.loginUser(recvData.username, recvData.password).then((result) => {
        if(result.status == 'ok'){
          let resultToServer = result;
          resultToServer['servertoken'] = 'j87s98dhfsa0shds0sfsh';
          // send result to game server
          sendJson(ws_gs, result);
          // send result back to client
          sendJson(ws, result);
          console.log('ls: \''+result.username+'\' logged in');
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

console.log('Login server (ls) is running on port', port);
