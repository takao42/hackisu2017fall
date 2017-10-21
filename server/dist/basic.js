'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// send data to specific client
function sendJson(ws, data) {
    ws.send(JSON.stringify(data));
}
exports.sendJson = sendJson;
// send data to all clients
function broadcast(server, data) {
    var msg = JSON.stringify(data);
    server.clients.forEach(client => {
        client.send(msg);
    });
}
exports.broadcast = broadcast;
;
function tryParseJson(jsonString) {
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
}
exports.tryParseJson = tryParseJson;
;
// Make the function wait until the connection is made...
function waitForConnection(socket, callback) {
    setTimeout(function () {
        if (socket.readyState === 1) {
            console.log("Connection is made");
            callback();
            return;
        }
        else {
            console.log("waiting for connection...");
            waitForConnection(socket, callback);
        }
    }, 100); // wait 100 milisecond for the connection...
}
exports.waitForConnection = waitForConnection;
//# sourceMappingURL=basic.js.map