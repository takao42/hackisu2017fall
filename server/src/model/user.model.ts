'use strict';

export class UserInfo {
  name: string;
  points: number;

  constructor(name: string, points: number) {
    this.name = name;
    this.points = points;
  }
}

export class LoggedInUser {
  name: string;
  token: string;
  
  constructor(name: string, token:string) {
    this.name = name;
    this.token = token;
  }
}

export class RegisteredUser {
  name: string;
  password: string;
  
  constructor(name: string, password:string) {
    this.name = name;
    this.password = password;
  }
}