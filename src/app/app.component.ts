import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  public user: any;

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit() {
    var sessionToken = sessionStorage.getItem("access_token");
    console.log(sessionToken);
    if(sessionStorage.length != 0){
      this.authService.token = sessionToken;
      this.authService.refreshToken().subscribe(re=>{
        console.log("session ", re);
      });
    }else{
      this.route.navigate(["login"]);
    }

  }
}
