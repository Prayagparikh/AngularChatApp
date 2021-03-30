import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import firebase from "firebase/app";
import { ErrorStateMatcher } from '@angular/material/core';
import "firebase/database";
import { AngularFireDatabase } from '@angular/fire/database'
import { AngularFireAuth } from '@angular/fire/auth'


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted; 
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  nickname = '';
  ref = firebase.database().ref('users/');
  matcher = new MyErrorStateMatcher();
  constructor(private router: Router, private formBuilder: FormBuilder) { 
    
}

  ngOnInit(): void {
    if (localStorage.getItem('nickname')) {
      this.router.navigate(['/roomlist/:nickname']);
    }
    this.loginForm = this.formBuilder.group({
      'nickname' : [null, Validators.required]
    });
  }
  
  onFormSubmit(form: any) {
    const login = form;
    this.ref.orderByChild('nickname').equalTo(login.nickname).once('value', snapshot => {
      if (snapshot.exists()) {
        localStorage.setItem('nickname', login.nickname);
        this.router.navigate(['/roomlist/:nickname']);
      } else {
        const newUser = firebase.database().ref('users/').push();
        newUser.set(login);
        localStorage.setItem('nickname', login.nickname);
        this.router.navigate(['/roomlist/:nickname']);
      }
    });
  }
} 