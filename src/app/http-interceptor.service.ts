import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req, next) {
    let tokenizedReq = req.clone();
    if(this.auth.isLoggedIn()) {
      tokenizedReq = req.clone({
        setHeaders:{
          Authorization: 'Bearer ' + localStorage.getItem('_token'),
        }
      })
    }
    

    return next.handle(tokenizedReq);
  }
}
