import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from './models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productos: Producto[] = []; 

  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:8000/api/productos'; 

  
  fetchProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl).pipe(
      map((productos) => {
        this.productos = productos; 
        return productos;
      })
    );
  }
}