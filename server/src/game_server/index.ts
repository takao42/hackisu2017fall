'use strict';

import WebSocket = require('ws');
import { sendJson, broadcast, tryParseJson } from "../basic";
import { Room } from "./model";
import { RoomManager } from "./room-manager";
import { UserManager } from "./user-manager";

//var port: number = process.env.PORT || 3000;
var port: number = 3001;
var WebSocketServer = WebSocket.Server;
var server = new WebSocketServer({ port: port });

var roomManager = new RoomManager();
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
    if (!('user_name' in recvData) || 
        !('token' in recvData)) {
      sendJson(ws, {
        action: recvData.action, 
        status: 'error', 
        reason: 'no user_name or token'
      });
      return;
    } 
    
    // try to make new room
    if(recvData.action == 'make room'){

      // check if room_name exists
      if (!('room_name' in recvData)) {
        sendJson(ws, {
          action: 'make room', 
          status: 'error', 
          reason: 'no room_name'
        });
        return;
      } 

      // the user has not logged in
      if(!userManager.checkUserToken(recvData.user_name, recvData.token)){
        sendJson(ws, {
          action: 'make room', 
          status: 'error', 
          reason: 'user has not logged in'
        });
        return;
      } 

      // make new room 
      if(!roomManager.makeRoom(recvData.room_name, recvData.user_name)) {
        sendJson(ws, {
          action: 'make room', 
          status: 'error', 
          reason: 'room cannot be created'
        });
        return;
      } 

      broadcast(server, {
        action: 'rooms updated', 
        status: 'ok',
        rooms: roomManager.getRooms()
      });
      console.log('gs: user:\''+recvData.user_name+'\' created room:\''+recvData.room_name+'\'');
      
    }

    // try to join room
    else if(recvData.action == 'join room'){

      // check if room_name exists
      if (!('room_id' in recvData)) {
        sendJson(ws, {
          action: 'make room', 
          status: 'error', 
          reason: 'no room_id'
        });
        return;
      } 

      // check if the user is logged in
      if(!userManager.checkUserToken(recvData.user_name, recvData.token)){
        sendJson(ws, {
          action: 'make room', 
          status: 'error', 
          reason: 'user has not logged in'
        });
        return;
      } 

      // try to join room
      if(!roomManager.joinRoom(recvData.room_id, recvData.user_name)){
        sendJson(ws, {
          action: 'join room', 
          status: 'error', 
          reason: 'cannot join room'
        });
        return;
      }

      // send the updated room list
      broadcast(server, {
        action: 'rooms updated', 
        status: 'ok', 
        rooms: roomManager.rooms
      });
      console.log('gs: user:\''+recvData.user_name+'\' joined room with ID:\''+recvData.room_id+'\'');
    }

    // tell client the current rooms
    else if(recvData.action == 'get rooms'){

      // check if the user is logged in
      if(!userManager.checkUserToken(recvData.user_name, recvData.token)){
        sendJson(ws, {
          action: 'make room', 
          status: 'error', 
          reason: 'user has not logged in'
        });
        return;
      } 

      // send the updated room list
      sendJson(ws, {
        action: 'get rooms', 
        status: 'ok', 
        rooms: roomManager.getRooms()
      });
    }

    // tell client the online users
    else if(recvData.action == 'get users'){

      // check if the user is logged in
      if(!userManager.checkUserToken(recvData.user_name, recvData.token)){
        sendJson(ws, {
          action: 'make room', 
          status: 'error', 
          reason: 'user has not logged in'
        });
        return;
      } 

      // send the updated online user list
      sendJson(ws, {
        action: 'get users', 
        status: 'ok', 
        user_names: userManager.userNames
      });
    }

    // new user from the login server
    // only allow requests from login server
    else if(recvData.action == 'login'){
      // check if server token exists
      // server token ensures this request is 
      // coming from login server
      if (!('server_token' in recvData)) {
        sendJson(ws, {
          action: 'get rooms', 
          status: 'error', 
          reason: 'no server_token'
        });
        return;
      } 
      if(recvData.server_token == 'j87s98dhfsa0shds0sfsh'){
        if(userManager.addUserWithToken(recvData.user_name, recvData.token)){
          broadcast(server, {
            action: 'users updated', 
            status: 'ok', 
            user_names: userManager.userNames
          });
          console.log('gs: \''+recvData.user_name+'\' logged in');
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
