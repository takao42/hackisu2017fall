'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class Message {
    constructor(message) {
        let data = JSON.parse(message);
        this.action = data.action;
    }
}
exports.Message = Message;
class RecvMessage {
    constructor(message) {
        let data = JSON.parse(message);
        this.action = data.action;
        this.user = data.user;
        this.content = data.content;
    }
}
exports.RecvMessage = RecvMessage;
class ErrorMessage {
    constructor(message) {
        let data = JSON.parse(message);
        this.action = data.action;
        this.reason = data.reason;
    }
}
exports.ErrorMessage = ErrorMessage;
//# sourceMappingURL=message.model.js.map