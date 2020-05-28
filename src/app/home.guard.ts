import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  
  constructor(private auth: AuthService, private router: Router) {}

  canActivate() {
    if(this.auth.isLoggedIn()) {
      return false;
    }
    else{
      return true;
      this.router.navigate(['/home']);
    }
  }
  
}
