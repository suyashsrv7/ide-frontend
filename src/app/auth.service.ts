import { Injectable } from '@angular/core';
import { RegisterUser } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  rootUrl: string = "http://localhost:8080";
  constructor(private http:HttpClient) { }

  register(user: RegisterUser) {
    return this.http.post(`${this.rootUrl}/register`, user);
  }

  authenticate(userCredentials) {
    return this.http.post(`${this.rootUrl}/authenticate`, userCredentials);
  }

  logout() {
    console.log("you have been logged out");
  }

  forgotPassword(email) {
    return this.http.get(`${this.rootUrl}/forgot-password?email=${email}`);
  }
  storeTokens(token) {
    localStorage.setItem('_token', token);
  }

  isLoggedIn() {
    return !!localStorage.getItem('_token');
  }

}
