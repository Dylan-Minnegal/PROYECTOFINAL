import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NuevoProducto, Producto } from './models/product';

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
    const token = sessionStorage.getItem('authToken');

    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });

    return this.http.put<Producto>(`${this.apiUrl}/${producto.id}`, producto, { headers }).pipe(
        map((productoActualizado) => {
            return productoActualizado;
        })
    );
}

  anadirProducto(producto: NuevoProducto): Observable<Producto> {
    const token = sessionStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Producto>(this.apiUrl, producto, { headers });
  }
  eliminarProducto(id: number): Observable<void> {
    const token = sessionStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
      map(() => {
        this.productos = this.productos.filter(producto => producto.id !== id);
      })
    );
  }


}
