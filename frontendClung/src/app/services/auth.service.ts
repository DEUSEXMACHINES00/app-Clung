import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global} from './global'
import { Observable } from 'rxjs';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL:string;

  constructor(private http: HttpClient,
      private router : Router) { 
    this.URL= Global.url;
  }

  singin(user){
    return this.http.post<any>(this.URL+"/ingresar",user)
  }

  loggedIn(){
    if(localStorage.getItem('token')){
      return true;
    }
  }

  getToken(){
    const token = localStorage.getItem('token');
    return token;
  }
  
}
