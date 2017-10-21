'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
const basic_1 = require("../basic");
var ls_gs = new WebSocket('ws://localhost:3002');
ls_gs.onerror = function (event) {
    console.log('Server is down');
    process.exit(); // end server
};
ls_gs.onmessage = function (msg) {
    console.log(msg.data);
};
basic_1.waitForConnection(ls_gs, start);
function start() {
    basic_1.sendJson(ls_gs, {
        action: 'login',
        username: 'user1',
        password: 'pass1'
    });
}
//# sourceMappingURL=index.js.map