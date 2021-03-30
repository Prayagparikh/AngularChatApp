import firebase  from 'firebase/app';
import { environment } from './../environments/environment';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';


import { AngularFireModule } from '@angular/fire'

const config = {
  apiKey: "AIzaSyDD9Tfc4qoApvG0VajjMcTcCnMWBtOQH_Q",
  databaseURL: 'https://chatapp-76184-default-rtdb.firebaseio.com'

  // apiKey: "AIzaSyA53HhWDJQTgPkf9VI1P0BjuNG8_bXUJBY",
  // databaseURL: 'https://chatapp-97a66-default-rtdb.firebaseio.com'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ChatApp';
  constructor() { 
    firebase.initializeApp(config);
  }

  ngOnInit(): void {

  }
  
  }


