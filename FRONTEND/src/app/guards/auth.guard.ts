import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = sessionStorage.getItem('authToken') !== null;

    if (!isAuthenticated) {
      this.router.navigate(['/']);
      return false;
    }

    return true; 
  }
}
