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

  selectedPatient:string = "patient1";
  selectedTask:string = "take-pill";
  version = '1.0.0';

  patients = [
    {value: 'patient1', viewValue: 'Aayush'},
    {value: 'patient2', viewValue: 'Takao'},
    {value: 'patient3', viewValue: 'Raed'}
  ]
  tasks = [
    {value: 'take-pill', viewValue: 'Take pill'},
    {value: 'exe', viewValue: 'Workout'},
    {value: 'eat-food', viewValue: 'Eat food'}
  ];

  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
    // make a new websocket
    this.socket = new WebSocket('ws://10.27.175.147:3005');

    var that = this;
    this.socket.onmessage = function (message) {
      console.log(message.data);
      let data = JSON.parse(message.data);

      if(data.action == "task added"){
        that.snackBar.open(data.count+"th task added" , "ok", {
          duration: 2000,
        });
      }
      
      if(data.action == "pill taken"){
        that.snackBar.open("pill taken "+data.count+" times" , "ok", {
          duration: 3000,
        });
      }
      
      if(data.action == "task cancelled"){
        that.snackBar.open("task cancelled" , "ok", {
          duration: 3000,
        });
      }
      
    };
  }

  open(){
    console.log('send take pill');
    this.socket.send(JSON.stringify({
      action: "add task",
      token: "webui"
    }));
  }

  cancel(){
    console.log('send cancel task');
    this.socket.send(JSON.stringify({
      action: "cancel task",
      token: "webui"
    }));
  }

}


