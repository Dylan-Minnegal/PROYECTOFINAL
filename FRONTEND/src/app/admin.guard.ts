import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const usuario = this.authService.getUsuario(); 
    const isAdmin = usuario && usuario.rol === 'admin'; 

    if (!isAdmin) {
      this.router.navigate(['/']); 
      return false; 
    }
    return true; 
  }
}
