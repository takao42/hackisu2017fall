'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
const db_management_1 = require("./db-management");
const basic_1 = require("../basic");
// game server websocket
var ws_gs = new WebSocket('ws://localhost:3001');
ws_gs.onerror = function (event) {
    console.log('Start the game server first!');
    process.exit(); // end server
};
var port = 3002;
var WebSocketServer = WebSocket.Server;
var server = new WebSocketServer({ port: port });
var userManager = new db_management_1.LoggedInUserManager();
// client connected to server
server.on('connection', (ws) => {
    // message recieved from client
    ws.on('message', (message) => {
        var recvData = basic_1.tryParseJson(message);
        if (recvData == null) {
            // recieved data is broken
            basic_1.sendJson(ws, {
                action: null,
                status: 'error',
                reason: 'broken JSON data'
            });
            return;
        }
        // signup request from client
        if (recvData.action == 'signup') {
            // check if name and password exist
            if (!('username' in recvData) || !('password' in recvData)) {
                basic_1.sendJson(ws, {
                    action: 'signup',
                    status: 'error',
                    reason: 'no name or password'
                });
                return;
            }
            userManager.signupUser(recvData.name, recvData.password).then((result) => {
                if (result.status == 'ok') {
                    basic_1.sendJson(ws, result);
                    console.log('ls: \'' + recvData.name + '\' registered');
                }
                else {
                    basic_1.sendJson(ws, result);
                }
            });
        }
        else if (recvData.action == 'login') {
            // check if name and password keys exist
            if (!('username' in recvData) || !('password' in recvData)) {
                basic_1.sendJson(ws, {
                    action: 'login',
                    status: 'error',
                    reason: 'no name or password'
                });
                return;
            }
            userManager.loginUser(recvData.username, recvData.password).then((result) => {
                if (result.status == 'ok') {
                    let resultToServer = result;
                    resultToServer['servertoken'] = 'j87s98dhfsa0shds0sfsh';
                    // send result to game server
                    basic_1.sendJson(ws_gs, result);
                    // send result back to client
                    basic_1.sendJson(ws, result);
                    console.log('ls: \'' + result.username + '\' logged in');
                }
                else {
                    basic_1.sendJson(ws, result);
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
//# sourceMappingURL=index.js.map