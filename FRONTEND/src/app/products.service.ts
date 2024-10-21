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

  private apiUrl = 'http://api.daw/api/productos';

  constructor(private http: HttpClient) { }

  fetchProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl).pipe(
      map((productos) => {
        this.productos = productos;
        return productos;
      })
    );
  }

  getProductoById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`).pipe(
      map((producto) => {
        return producto; 
      })
    );
  }
  actualizarProducto(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${producto.id}`, producto).pipe(
      map((productoActualizado) => {
        return productoActualizado;
      })
    );
  }
  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      map(() => {
        this.productos = this.productos.filter(producto => producto.id !== id);
      })
    );
  }
  
}
