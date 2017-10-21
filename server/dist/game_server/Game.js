'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(userName) {
        this.userName = userName;
        this.points = 25000;
    }
}
exports.Player = Player;
class Game {
    constructor(hostUserName) {
        this.hostUserName = hostUserName;
        this.players = [];
    }
    addUser(userName) {
        this.players.push(new Player(userName));
    }
    // start game
    start() {
    }
}
exports.Game = Game;
//# sourceMappingURL=Game.js.map