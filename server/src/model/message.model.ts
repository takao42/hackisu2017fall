'use strict';

import {LoggedInUser} from './user.model';

export class Message {
    action: string;
    content: string;

    constructor(message: string) {
      let data = JSON.parse(message);
      this.action = data.action;
    }
}

export class RecvMessage {
    action: string;
    user: LoggedInUser;
    content: any;

    constructor(message: string) {
      let data = JSON.parse(message);
      this.action = data.action;
      this.user = data.user;
      this.content = data.content;
    }
}

export class ErrorMessage {
    action: string;
    status: string;
    reason: string;

    constructor(message: string) {
      let data = JSON.parse(message);
      this.action = data.action;
      this.reason = data.reason;
    }
}
