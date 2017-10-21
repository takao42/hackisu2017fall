'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class UserInfo {
    constructor(name, points) {
        this.name = name;
        this.points = points;
    }
}
exports.UserInfo = UserInfo;
class LoggedInUser {
    constructor(name, token) {
        this.name = name;
        this.token = token;
    }
}
exports.LoggedInUser = LoggedInUser;
class RegisteredUser {
    constructor(name, password) {
        this.name = name;
        this.password = password;
    }
}
exports.RegisteredUser = RegisteredUser;
//# sourceMappingURL=user.model.js.map