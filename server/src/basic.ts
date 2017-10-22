'use strict';

import WebSocket = require('ws');

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
