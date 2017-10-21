'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
process.on('message', (msg) => {
    console.log('Message from parent:', msg);
    if (msg.action == "start game") {
    }
});
//var port: number = process.env.PORT || 3000;
var port = 3001;
var WebSocketServer = WebSocket.Server;
var server = new WebSocketServer({ port: port });
// client connected to server
server.on('connection', (ws, req) => {
    // message recieved from client
    ws.on('message', (message) => {
        // recieved data
        var recvData = null;
        try {
            recvData = JSON.parse(message);
        }
        catch (e) {
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
        // user_name and token exist don't exist
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
        if (recvData.action == 'start game') {
        }
    });
    // client disconnected
    ws.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
// send data to specific client
function sendJson(ws, data) {
    ws.send(JSON.stringify(data));
}
// send data to all clients
function broadcast(data) {
    var msg = JSON.stringify(data);
    server.clients.forEach(client => {
        client.send(msg);
    });
}
;
console.log('Game server (gs) is running on port', port);
//# sourceMappingURL=game_server.js.map