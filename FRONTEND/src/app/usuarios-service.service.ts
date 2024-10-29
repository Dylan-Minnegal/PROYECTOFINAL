import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroment/enviroment';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  obtenerUsuarioPorId(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuarios/${userId}`);
  }
  registrarUsuario(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuarios`, user);
  }
}
