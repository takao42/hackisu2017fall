'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class Room {
    constructor(roomName, id, hostUserName, port) {
        this.roomName = roomName;
        this.id = id;
        this.hostUserName = hostUserName;
        this.playingUserNames = [hostUserName];
        this.port = port;
    }
    // add user to the room
    addUser(userName) {
        // check if the user is already in game
        if (this.checkUserName(userName)) {
            return false;
        }
        if (this.playingUserNames.length < 4) {
            this.playingUserNames.push(userName);
            return true;
        }
        return false;
    }
    // change host user of the room
    changeHostUser(newHostUserName) {
        if (!this.checkUserName(newHostUserName)) {
            return false;
        }
        this.hostUserName = newHostUserName;
        return true;
    }
    // check if the user is in the game
    checkUserName(userName) {
        for (let i = 0; i < this.playingUserNames.length; i++) {
            if (this.playingUserNames[i] = userName) {
                return true;
            }
        }
        return false;
    }
}
exports.Room = Room;
//# sourceMappingURL=room.model.js.map