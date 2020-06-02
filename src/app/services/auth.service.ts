import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // http options used for making API calls
  private httpOptions: any;
 
  // the actual JWT token
  public token: string;
 
  // the token expiration date
  public token_expires: Date;
 
  // the username of the logged in user
  public username: string;
 
  // error messages received from the login attempt
  public errors: any = [];
  constructor(private http: HttpClient) { 
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }


    // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
    public login(user): Observable<any> {
      return this.http.post('http://homepowerapp.herokuapp.com/api-token-auth/', JSON.stringify(user), this.httpOptions).pipe(
        map(data => {
          this.updateData(data['token']);
          return "logged in";
        }),
        catchError(err=>{
          this.errors = err['error'];
          return err["error"].non_field_errors;
          // console.log(err["error"].non_field_errors[0]);
        })
      );
    }
   
   // Refreshes the JWT token, to extend the time the user is logged in
   public refreshToken(): Observable<any> {
    return this.http.post('http://homepowerapp.herokuapp.com/api-token-refresh/', JSON.stringify({token: this.token}), this.httpOptions).pipe(
      map(data => {
        this.updateData(data['token']);
        return "logged in";
      }),
      catchError(err => {
        this.errors = err['error'];
        return err["error"].non_field_errors;
      })
    );
  }
  
  public getResidence(username){
    let url = "http://homepowerapp.herokuapp.com/send/send";
    return this.http.get(url, {params: {username: username,type:"getResidence"}}).pipe(
      map(results => {
        console.log("Results",results);
        return results["data"];
      })
    );
  }

  getUnit(unit_id){
    let url = "http://homepowerapp.herokuapp.com/send/send";
    return this.http.get(url, {params: {id: unit_id,type:"getUnit"}}).pipe(
      map(results => {
        console.log("Results",results);
        return results["unitdata"];
      })
    );
  }

  Power(state,cell){
    let url = "http://homepowerapp.herokuapp.com/send/send";
    return this.http.get(url, {params: {state: state, type:"power",cell:cell}}).pipe(
      map(results => {
        console.log("Results",results);
        return results["Response"];
      })
    );
  }

  public logout() {
    this.token = null;
    this.token_expires = null;
    this.username = null;
  }

  private updateData(token) {
    this.token = token;
    sessionStorage.setItem("access_token", token);
    this.errors = [];
 
    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
  }

  decodeToken(){
    var token = sessionStorage.getItem("access_token");
    const token_parts = token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    var username = token_decoded.username;
    return username;
  }
}
