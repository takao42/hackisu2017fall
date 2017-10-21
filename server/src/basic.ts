'use strict';

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