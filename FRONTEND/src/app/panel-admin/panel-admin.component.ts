import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products.service'; 
import { CartProduct, Producto } from '../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.sass']
})
export class PanelAdminComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productService.fetchProductos().subscribe(data => {
      this.productos = data;
      console.log(this.productos)
    });
  }

  eliminarProducto(productId: number): void {
    this.productService.eliminarProducto(productId).subscribe(() => {
      this.productos = this.productos.filter(producto => producto.id !== productId);
    });
  }

  actualizarProducto(product: Producto): void {
    this.router.navigate(['/actualizar-producto', product.id]); 
}
}
