import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getAuthStatus(){
    const authToken = localStorage.getItem("authToken");
    return authToken;
   }
}
