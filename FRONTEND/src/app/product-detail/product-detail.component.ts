
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../products.service';
import { Producto } from '../models/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.sass'],

})
export class ProductDetailComponent implements OnInit {
  producto: Producto | undefined;
  selectedTalla: string | undefined;
  selectedCantidad: number | null = null;


  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); 
    this.productService.getProductoById(id).subscribe(
      (producto) => {
        this.producto = producto;
      },
      (error) => {
        console.error('Error al obtener el producto:', error);
      }
    );
  }

  onTallaChange(): void {
    if (this.producto) {
      const tallaSeleccionada = this.producto.tallas.find(t => t.talla === this.selectedTalla);
      if (tallaSeleccionada) {
        this.selectedCantidad = tallaSeleccionada.pivot.cantidad;
      } else {
        this.selectedCantidad = null;
      }
    }
  }
}
