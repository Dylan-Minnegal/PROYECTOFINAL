import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products.service';
import { Producto } from '../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productService.fetchProductos().subscribe(productos => {
      this.productos = productos; 
      console.log(this.productos);
    }, error => {
      console.error('Error al cargar los productos', error); 
    });
  }
}
