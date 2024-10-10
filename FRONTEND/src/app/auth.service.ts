import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://api.daw/api'; 
  private authTokenKey = 'authToken'; 
  private usuarioKey = 'usuario'; 

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };

    return this.http.post(url, body, { headers });
  }

  storeSessionData(token: string, usuario: any): void {
    sessionStorage.setItem(this.authTokenKey, token);
    sessionStorage.setItem(this.usuarioKey, JSON.stringify(usuario));
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem(this.authTokenKey) !== null;
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.authTokenKey);
  }

  logout(): void {
    sessionStorage.removeItem(this.authTokenKey);
    sessionStorage.removeItem(this.usuarioKey);
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  getUsuario(): any {
    const usuario = sessionStorage.getItem(this.usuarioKey);
    return usuario ? JSON.parse(usuario) : null;
  }
}