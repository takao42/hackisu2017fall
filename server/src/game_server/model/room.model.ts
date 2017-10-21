'use strict';

export class Room {
  playingUserNames: string[]; // users playing in this room
  hostUserName: string; // host user name
  roomName: string; // room name
  id: string; // ID of the room
  port: number; // port of the room server

  constructor(roomName: string, id: string, hostUserName: string, port:number) {
    this.roomName = roomName
    this.id = id;
    this.hostUserName = hostUserName;
    this.playingUserNames = [hostUserName];
    this.port = port;
  }

  // add user to the room
  addUser(userName: string): boolean {
    // check if the user is already in game
    if(this.checkUserName(userName)){
      return false;
    }
    if(this.playingUserNames.length < 4){
      this.playingUserNames.push(userName);
      return true;
    }
    return false;
  }

  // change host user of the room
  changeHostUser(newHostUserName: string): boolean {
    if(!this.checkUserName(newHostUserName)){
      return false;
    }
    this.hostUserName = newHostUserName;
    return true;
  }

  // check if the user is in the game
  checkUserName(userName: string) {
    for(let i = 0; i < this.playingUserNames.length; i++){
      if(this.playingUserNames[i] = userName){
        return true;
      }
    }
    return false;
  }

}

