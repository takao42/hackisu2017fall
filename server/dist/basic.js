'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
const model_1 = require("./model");
exports.testLoggedInUsers = [
    new model_1.LoggedInUser('user11', 'token1'),
    new model_1.LoggedInUser('user12', 'token2'),
    new model_1.LoggedInUser('user13', 'token3'),
    new model_1.LoggedInUser('user14', 'token4'),
    new model_1.LoggedInUser('user15', 'token5'),
    new model_1.LoggedInUser('user16', 'token6'),
    new model_1.LoggedInUser('user17', 'token7'),
    new model_1.LoggedInUser('user18', 'token8'),
    new model_1.LoggedInUser('user19', 'token8'),
];
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
function tryConnect(socket, addr, callback) {
    setTimeout(function () {
        socket = new WebSocket(addr);
        socket.onerror = function (event) {
            console.log('Server is down');
            process.exit(); // end server
        };
        waitForConnection(socket, callback);
    }, 200);
}
exports.tryConnect = tryConnect;
//# sourceMappingURL=basic.js.map