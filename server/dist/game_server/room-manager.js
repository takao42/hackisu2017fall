'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
class RoomManager {
    constructor() {
        this.rooms = [];
        this.roomServers = {};
        this.playingUsers = [];
        this.currId = 0;
        this.currPort = 3500;
    }
    // make new room
    makeRoom(roomName, hostName) {
        // check if the user is playing
        if (this.checkUserPlaying(hostName)) {
            return false;
        }
        // check if room already exists
        if (this.checkRoom(roomName)) {
            return false;
        }
        let id = '' + this.currId;
        let newRoom = new model_1.Room(roomName, id, hostName, this.currPort);
        this.rooms.push(newRoom);
        this.playingUsers.push(hostName);
        this.roomServers[id] = (fork('dist/game_server/room_server.js'));
        this.roomServers[id].send({
            action: "start game",
            port: this.currPort,
            roomId: id
        });
        this.currId++;
        this.currPort++;
        return true;
    }
    // join room by room ID
    joinRoom(roomId, userName) {
        // check if the user is already
        if (this.checkUserPlaying(userName)) {
            return false;
        }
        // check if room already exists
        if (!this.checkRoomWithId(roomId)) {
            return false;
        }
        this.rooms[this.getRoomIdxWithId(roomId)].addUser(userName);
        return true;
    }
    // delete room
    // should be called only by server
    delRoom(roomName) {
        let idx = this.getRoomIdx(roomName);
        if (idx < 0) {
            return false;
        }
        this.rooms.splice(idx, 1);
        return true;
    }
    // check if the room with the given name already exists
    checkRoom(roomName) {
        for (let i = 0; i < this.rooms.length; i++) {
            if (this.rooms[i].roomName == roomName) {
                return true;
            }
        }
        return false;
    }
    // check if the room with the given id already exists
    checkRoomWithId(roomId) {
        for (let i = 0; i < this.rooms.length; i++) {
            if (this.rooms[i].id == roomId) {
                return true;
            }
        }
        return false;
    }
    // return index of room
    // return -1 if there is no room with the given name
    getRoomIdx(roomName) {
        for (let i = 0; i < this.rooms.length; i++) {
            if (this.rooms[i].roomName == roomName) {
                return i;
            }
        }
        return -1;
    }
    // return index of room
    // return -1 if there is no room with the given name
    getRoomIdxWithId(roomId) {
        for (let i = 0; i < this.rooms.length; i++) {
            if (this.rooms[i].id == roomId) {
                return i;
            }
        }
        return -1;
    }
    checkUserPlaying(name) {
        for (let i = 0; i < this.playingUsers.length; i++) {
            if (this.playingUsers[i] == name) {
                return true;
            }
        }
        return false;
    }
    getRooms() {
        return this.rooms;
    }
    getRoomWithName(roomName) {
        for (let i = 0; i < this.rooms.length; i++) {
            if (this.rooms[i].roomName == roomName) {
                return this.rooms[i];
            }
        }
        return null;
    }
    getRoomWithId(roomId) {
        for (let i = 0; i < this.rooms.length; i++) {
            if (this.rooms[i].id == roomId) {
                return this.rooms[i];
            }
        }
        return null;
    }
}
exports.RoomManager = RoomManager;
//# sourceMappingURL=room-manager.js.map