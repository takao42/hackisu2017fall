"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
const basic_1 = require("./basic");
var socket = new WebSocket('ws://10.27.175.147:3005');
basic_1.waitForConnection(socket, start);
function start() {
    basic_1.sendJson(socket, {
        action: "ajslkjdl"
    });
}
//# sourceMappingURL=test-hardware.js.map