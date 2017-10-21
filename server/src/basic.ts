'use strict';

import WebSocket = require('ws');

import { LoggedInUser } from "./model";
import { RegisteredUser } from "./model";

export var testLoggedInUsers: LoggedInUser[] = [
  new LoggedInUser('user11','token1'),
  new LoggedInUser('user12','token2'),
  new LoggedInUser('user13','token3'),
  new LoggedInUser('user14','token4'),
  new LoggedInUser('user15','token5'),
  new LoggedInUser('user16','token6'),
  new LoggedInUser('user17','token7'),
  new LoggedInUser('user18','token8'),
  new LoggedInUser('user19','token8'),
];

// send data to specific client
export function sendJson(ws, data): void {
  ws.send(JSON.stringify(data));
}

// send data to all clients
export function broadcast(server, data): void {
  var msg = JSON.stringify(data);
  server.clients.forEach(client => {
    client.send(msg);
  });  
};

export function tryParseJson (jsonString: string){
  try {
    var o = JSON.parse(jsonString);

    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // but... JSON.parse(null) returns null, and typeof null === "object", 
    // so we must check for that, too. Thankfully, null is falsey, so this suffices:
    if (o && typeof o === "object") {
        return o;
    }
  }
  catch (e) { }

  return null;
};

// Make the function wait until the connection is made...
export function waitForConnection(socket, callback){
  setTimeout(  function () {
    if (socket.readyState === 1) {
      console.log("Connection is made")
      callback();
      return;
    } else {
      console.log("waiting for connection...")
      waitForConnection(socket, callback);
    }

  }, 100); // wait 100 milisecond for the connection...
}

export function tryConnect(socket, addr, callback){
  setTimeout( function(){
    socket = new WebSocket(addr);
    socket.onerror = function(event){
      console.log('Server is down');
      process.exit(); // end server
    }
    waitForConnection(socket, callback);
  }, 200);
  
}