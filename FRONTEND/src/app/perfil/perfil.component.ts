import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../enviroment/enviroment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.sass'
})
export class PerfilComponent {
  perfil: any = {}; 
  perfilEdicion: any = {}; 
  enEdicion: boolean = false; 
  private apiUrl = environment.apiUrl+'/usuarios';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.perfil = JSON.parse(sessionStorage.getItem('usuario') || '{}');
    const token = sessionStorage.getItem('authToken');
  }
  activarEdicion(): void {
    this.perfilEdicion = { ...this.perfil };
    this.enEdicion = !this.enEdicion;
  }
  actualizarPerfil(): void {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.put(this.apiUrl, this.perfilEdicion, { headers }).subscribe(
      response => {
        console.log('Perfil actualizado:', response);
        this.perfil = { ...this.perfilEdicion }; 
        sessionStorage.setItem('usuario', JSON.stringify(this.perfil)); 
        this.enEdicion = false; 
      },
      error => {
        console.error('Error al actualizar el perfil:', error);
      }
    );
  }

}
