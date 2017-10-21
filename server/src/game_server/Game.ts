'use strict';

export class Player {
  userName: string;
  points: number;

  constructor(userName: string){
    this.userName = userName;
    this.points = 25000;
  }
}

export class Game {
  hostUserName: string;
  players: Player[];


  constructor(hostUserName: string){
    this.hostUserName = hostUserName;
    this.players = [];
  }

  addUser(userName: string){
    this.players.push(new Player(userName));
  }

  // start game
  start(){

  }


}

