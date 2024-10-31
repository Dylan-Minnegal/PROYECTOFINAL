import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartProduct } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cantidadArticulosCarrito = new BehaviorSubject<number>(0);
  cantidadActualCarrito = this.cantidadArticulosCarrito.asObservable();

  private articulosCarrito = new BehaviorSubject<CartProduct[]>([]);
  articulosActualesCarrito = this.articulosCarrito.asObservable();

  constructor() {
    const articulosDesdeLocalStorage = this.cargarCarritoDesdeLocalStorage();
    this.articulosCarrito.next(articulosDesdeLocalStorage); 
    this.actualizarConteoProductosUnicos();
  }

  añadirProductoAlCarrito(producto: CartProduct): void {
    let articulosActuales = this.articulosCarrito.value;

    const indiceArticulo = articulosActuales.findIndex(item => item.id === producto.id && item.talla === producto.talla);

    if (indiceArticulo !== -1) {
      articulosActuales[indiceArticulo].cantidad += producto.cantidad;
    } else {
      articulosActuales.push({ ...producto, cantidad: producto.cantidad });
    }

    this.articulosCarrito.next(articulosActuales);
    this.guardarCarritoEnLocalStorage();
    this.actualizarConteoProductosUnicos(); 
  }

  private actualizarConteoProductosUnicos(): void {
    const conteoProductosUnicos = this.articulosCarrito.value.length;
    this.cantidadArticulosCarrito.next(conteoProductosUnicos);
  }

  obtenerArticulosDelCarrito(): CartProduct[] {
    return this.articulosCarrito.value;
  }

  eliminarProductoDelCarrito(productoId: number): void {
    let articulosActuales = this.articulosCarrito.value;

    articulosActuales = articulosActuales.filter(item => item.id !== productoId);

    this.articulosCarrito.next(articulosActuales);
    this.guardarCarritoEnLocalStorage(); 
    this.actualizarConteoProductosUnicos();
  }

  limpiarCarrito(): void {
    this.articulosCarrito.next([]);
    localStorage.removeItem('carritoArticulos');
    this.actualizarConteoProductosUnicos();
  }
  private guardarCarritoEnLocalStorage(): void {
    const articulos = this.articulosCarrito.value;
    localStorage.setItem('carritoArticulos', JSON.stringify(articulos));
  }

  private cargarCarritoDesdeLocalStorage(): CartProduct[] {
    const articulos = localStorage.getItem('carritoArticulos');
    return articulos ? JSON.parse(articulos) : [];
  }
}
