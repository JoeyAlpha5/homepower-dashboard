import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form:{
    username:string;
    password:string;
  }
  err = null;
  loggedIn = false;
  constructor(private authService: AuthService, private route: Router) {
    this.form ={
      username: '',
      password: '',
    }
   }
  ngOnInit(): void {
    var sessionToken = sessionStorage.getItem("access_token");
    if(sessionStorage.length == 0){
      this.loggedIn = true;
    }
  }

  async login() {
    var login = this.authService.login({'username': this.form.username, 'password': this.form.password});
    login.subscribe(re=>{
      console.log(re);
      if(re == "Unable to log in with provided credentials." ){
        this.err = true; 
        this.authService.token = null;
      }else{
        this.err = false;
        this.route.navigate(["dashboard"]);
      } 
    })
  }
}
