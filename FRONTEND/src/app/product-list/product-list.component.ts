import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products.service';
import { Producto } from '../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass'],
})
export class ProductListComponent implements OnInit {
  productos: Producto[] = [];
  searchText: string = '';
  categoriasSeleccionadas: string[] = [];
  sexosSeleccionados: string[] = [];
  tallasSeleccionadas: string[] = []; 
  minPrice: number = 0;
  maxPrice: number = 10000000;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productService.fetchProductos().subscribe(productos => {
      this.productos = productos;
    }, error => {
      console.error('Error al cargar los productos', error);
    });
  }

  onFilterChange(filters: {
    categorias: string[],
    sexos: string[],
    tallas: string[],
    minPrice: number,
    maxPrice: number
  }) {
    this.categoriasSeleccionadas = filters.categorias;
    this.sexosSeleccionados = filters.sexos;
    this.tallasSeleccionadas = filters.tallas; // Asignar tallas seleccionadas
    this.minPrice = filters.minPrice; 
    this.maxPrice = filters.maxPrice;

    console.log('Filtros aplicados:', {
      categorias: this.categoriasSeleccionadas,
      sexos: this.sexosSeleccionados,
      tallas: this.tallasSeleccionadas,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
    });
  }

  get filteredProducts() {
    return this.productos.filter(producto => 
      (this.categoriasSeleccionadas.length === 0 || this.categoriasSeleccionadas.includes(producto.categoria)) &&
      (this.sexosSeleccionados.length === 0 || this.sexosSeleccionados.includes(producto.sexo)) &&
      (this.tallasSeleccionadas.length === 0 || 
        this.tallasSeleccionadas.some(tallaSeleccionada => 
          producto.tallas.some(talla => talla.talla === tallaSeleccionada)
        )
      ) && 
      (producto.precio >= this.minPrice && producto.precio <= this.maxPrice)
    );
  }
}
