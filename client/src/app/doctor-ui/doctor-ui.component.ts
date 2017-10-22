import { Component, OnInit, Inject } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-doctor-ui',
  templateUrl: './doctor-ui.component.html',
  styleUrls: ['./doctor-ui.component.css']
})
export class DoctorUiComponent implements OnInit {

  socket:any;
  touched:boolean = false;

  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
    // make a new websocket
    this.socket = new WebSocket('ws://10.27.175.147:3005');

    var that = this;
    this.socket.onmessage = function (message) {
      console.log(message.data);
      let data = JSON.parse(message.data);
      
      console.log(that)
      that.snackBar.open("pill taken "+data.count+" times", "done", {
        duration: 2000,
      });


    };
  }

  open(){
    console.log('send take pill');
    this.socket.send(JSON.stringify({
      action: "add task",
      token: "webui"
    }));
  }

}


