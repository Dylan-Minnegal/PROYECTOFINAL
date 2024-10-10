import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../products.service';
import { Producto, Valoracion } from '../models/product';
import { ValoracionesService } from '../valoraciones.service';
import { UsuarioService } from '../usuarios-service.service'; 
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.sass'],
})
export class ProductDetailComponent implements OnInit {
  authToken: string | null = null;
  isAuthenticated = false; 
  producto: Producto | undefined;
  valoraciones: Valoracion[] = [];
  selectedTalla: string | undefined;
  selectedCantidad: number | null = null;
  valoracion = {
    calificacion: 5,
    comentario: '',    
  };


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private valoracionesService: ValoracionesService,
    private usuarioService: UsuarioService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();

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
    this.authToken = sessionStorage.getItem('authToken');
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

        this.valoraciones.forEach((valoracion) => {
          this.usuarioService.obtenerUsuarioPorId(valoracion.id_usuario).subscribe(
            (usuario) => {
              valoracion.nombreUsuario = usuario.nombre;
              valoracion.apellidosUsuario = usuario.apellidos;       
            },
            (error) => {
              console.error(`Error al cargar el nombre del usuario con ID ${valoracion.id_usuario}:`, error);
            }
          );
        });

      },
      (error) => {
        console.error('Error al cargar las valoraciones:', error);
      }
    );
  }

  submitReview(calificacionForm: any): void {
    const usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}');

    if (!this.authToken) {
      return;
    }
    if (!usuario) {
      return;
    }

    if (!this.producto) {
      console.error('Producto no encontrado. No se puede enviar la valoración.');
      return;
    }

    const reviewData = {
      calificacion: this.valoracion.calificacion,
      comentario: this.valoracion.comentario,
      product_id: this.producto.id,
      id_usuario: usuario.id 
    };

    this.valoracionesService.enviarValoracion(reviewData);
    calificacionForm.resetForm();
    window.location.reload()
  }
}
