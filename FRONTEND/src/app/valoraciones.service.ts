import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Valoracion } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ValoracionesService {
  private apiUrl: string = 'http://api.daw/api/valoraciones'; 

  constructor(private http: HttpClient) {}

  obtenerValoracionesPorProductoId(productId: number): Observable<Valoracion[]> {
    const url = `${this.apiUrl}/${productId}`; // Construir la URL con el ID
    return this.http.get<Valoracion[]>(url); // Realizar la petición GET y devolver un Observable
  }

  enviarValoracion(review: Valoracion): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(this.apiUrl, review, { headers }).subscribe(
      (response) => {
        console.log('Valoración enviada con éxito:', response);
      },
      (error) => {
        console.error('Error al enviar la valoración:', error);
        console.log(review)
      }
    );
  }
}
