'use strict';

import WebSocket = require('ws');
import { sendJson, broadcast, tryParseJson } from "../basic";
import { UserManager } from "./user-manager";

//var port: number = process.env.PORT || 3000;
var port: number = 3001;
var WebSocketServer = WebSocket.Server;
var server = new WebSocketServer({ port: port });

var userManager = new UserManager();

// client connected to server
server.on('connection', (ws: WebSocket, req) => {

  // message recieved from client
  ws.on('message', (message: string) => {

    // recieved data
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

    // action doesn't exists
    if (!('action' in recvData)) {
      sendJson(ws, {
        action: null, 
        status: 'error', 
        reason: 'no action'
      });
      return;
    } 

    // user_name and token don't exist
    if (!('username' in recvData) || 
        !('token' in recvData)) {
      sendJson(ws, {
        action: recvData.action, 
        status: 'error', 
        reason: 'no username or token'
      });
      return;
    } 
    
    if(recvData.action == 'add todo'){

    }

    // new user from the login server
    // only allow requests from login server
    else if(recvData.action == 'login'){
      // check if server token exists
      // server token ensures this request is 
      // coming from login server
      if (!('servertoken' in recvData)) {
        sendJson(ws, {
          action: 'get rooms', 
          status: 'error', 
          reason: 'no server_token'
        });
        return;
      } 
      
      if(recvData.servertoken == 'j87s98dhfsa0shds0sfsh'){
        if(userManager.addUserWithToken(recvData.username, recvData.token)){
          broadcast(server, {
            action: 'users updated', 
            status: 'ok', 
            usernames: userManager.usernames
          });
          console.log('gs: \''+recvData.username+'\' logged in');
        } else{
          // error
        }     
      }

      //console.log('gs: ', req.connection.remoteAddress);
      //console.log('gs: ', req.connection.remotePort);
    }
  
  });

  // client disconnected
  ws.on('disconnect', () => {
    console.log('Client disconnected');
  });

});

console.log('Game server (gs) is running on port', port);
