'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../model");
const basic_1 = require("../basic");
class UserManager {
    constructor() {
        this.users = basic_1.testLoggedInUsers;
        //this.users = [];
        this.usernames = [];
    }
    // add new user
    addUserWithToken(username, token) {
        if (!this.checkUserToken(username, token)) {
            this.users.push(new model_1.LoggedInUser(username, token));
            this.usernames.push(username);
            return true;
        }
        return false;
    }
    // check if a user with the given token exists
    checkUserToken(username, token) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].name == username && this.users[i].token == token) {
                return true;
            }
        }
        return false;
    }
}
exports.UserManager = UserManager;
//# sourceMappingURL=user-manager.js.map