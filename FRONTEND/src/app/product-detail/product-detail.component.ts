import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../products.service';
import { Producto, Valoracion } from '../models/product';
import { ValoracionesService } from '../valoraciones.service'; // Importar el servicio


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.sass'],
})
export class ProductDetailComponent implements OnInit {
  producto: Producto | undefined;
  valoraciones: Valoracion[] = []; 
  selectedTalla: string | undefined;
  selectedCantidad: number | null = null;
  valoracion = {
    calificacion: 5, 
    comentario: ''
  };

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService, 
    private valoracionesService: ValoracionesService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductoById(id).subscribe(
      (producto) => {
        this.producto = producto;
        
        if (this.producto && this.producto.id) {
          this.cargarValoraciones(this.producto.id);
        }
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

  cargarValoraciones(productId: number): void {
    this.valoracionesService.obtenerValoracionesPorProductoId(productId).subscribe(
      (data) => {
        this.valoraciones = data; 
        console.log('Valoraciones recibidas:', this.valoraciones);
      },
      (error) => {
        console.error('Error al cargar las valoraciones:', error);
      }
    );
  }

  submitReview(): void {
    if (!this.producto) {
      console.error('Producto no encontrado. No se puede enviar la valoración.');
      return;
    }

    const reviewData = {
      calificacion: this.valoracion.calificacion, 
      comentario: this.valoracion.comentario,
      product_id: this.producto.id
    };

    this.valoracionesService.enviarValoracion(reviewData);
    this.valoracion = { calificacion: 5, comentario: '' }; 
  }
}
