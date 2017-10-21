'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
const basic_1 = require("../basic");
// game server websocket
var ws_gs = new WebSocket('ws://localhost:3001');
ws_gs.onerror = function (event) {
    console.log('Game server is down');
    process.exit(); // end server
};
basic_1.waitForConnection(ws_gs, start);
function start() {
    basic_1.sendJson(ws_gs, "afa");
    basic_1.sendJson(ws_gs, { action: "afa" });
}
ws_gs.onmessage = function (msg) {
    console.log(msg.data);
};
//# sourceMappingURL=index.js.map