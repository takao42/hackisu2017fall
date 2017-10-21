'use strict';

import { LoggedInUser } from "../model";
import { testLoggedInUsers } from "../basic";

export class UserManager {

  users: LoggedInUser[];
  usernames: string[];

  constructor(){
    this.users = testLoggedInUsers;
    //this.users = [];
    this.usernames = [];
  }

  // add new user
  addUserWithToken(username: string, token: string): boolean {
    if(!this.checkUserToken(username, token)){
      this.users.push(new LoggedInUser(username, token));
      this.usernames.push(username);
      return true;
    }
    return false;
  }

  // check if a user with the given token exists
  checkUserToken(username:string, token: string): boolean {
    for(let i = 0; i < this.users.length; i++){
      if(this.users[i].name == username && this.users[i].token == token){
        return true;
      }
    }
    return false;
  }
}
