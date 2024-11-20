import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../products.service';
import { Producto, Valoracion, ValoracionCrear } from '../models/product';
import { ValoracionesService } from '../valoraciones.service';
import { UsuarioService } from '../usuarios-service.service'; 
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import Swal from 'sweetalert2';



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
  cantidad: number = 1;
  cantidadDisponible: number = 0;
  valoracion = {
    calificacion: 5,
    comentario: '',    
  };
  usuario: any = null;
  rolUsuario: boolean = false; 


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private valoracionesService: ValoracionesService,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private cartService: CartService
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
    const usuarioString = sessionStorage.getItem('usuario');

    if (usuarioString) {
      this.usuario = JSON.parse(usuarioString); 
      this.rolUsuario = this.usuario.rol === 'admin'; 
    }
  }

  onTallaChange(): void {
    if (this.producto && this.producto.tallas) {
      const tallaSeleccionada = this.producto.tallas.find((talla: any) => talla.talla === this.selectedTalla);
  
      if (tallaSeleccionada) {
        this.cantidadDisponible = tallaSeleccionada.pivot?.cantidad || 0;
      } else {
        this.cantidadDisponible = 0;
      }
    }
  }
  agregarAlCarrito(): void {
    if (this.producto && this.selectedTalla && this.cantidad > 0 && this.cantidad <= this.cantidadDisponible) {
        const tallaSeleccionada = this.producto.tallas.find(
        (talla: any) => talla.talla === this.selectedTalla
      );

      const stockDisponible = tallaSeleccionada ? tallaSeleccionada.pivot.cantidad : 0;

      const productoCarrito = {
        id: this.producto.id,
        imagen: this.producto.imagen,
        nombre: this.producto.nombre,
        precio: this.producto.precio,
        talla: this.selectedTalla,
        cantidad: this.cantidad,
        stock: stockDisponible 
      };

      this.cartService.añadirProductoAlCarrito(productoCarrito);
    } else {
      console.error('El producto o los parámetros del carrito no son válidos.');
    }
}

  cargarValoraciones(productId: number): void {
    this.valoracionesService.obtenerValoracionesPorProductoId(productId).subscribe(
      (data) => {
        
        if (data && (data as any).message) {
          this.valoraciones = []; 
          return;
        }
  
        if (Array.isArray(data)) {
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
        }
      },
      (error) => {
        console.error('Error al cargar las valoraciones:', error);
      }
    );
  }
  

  submitReview(calificacionForm: any): void {
    const usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}');

    if (!this.producto) {
      console.error('Producto no encontrado. No se puede enviar la valoración.');
      return;
    }

    const reviewData: ValoracionCrear = {
      product_id: this.producto.id,
      id_usuario: usuario.id,
      calificacion: this.valoracion.calificacion,
      comentario: this.valoracion.comentario,
    };

    this.valoracionesService.enviarValoracion(reviewData);
    calificacionForm.resetForm();
    Swal.fire({
      icon: 'success',
      title: '¡Valoración enviada!',
      text: 'Tu valoración se ha realizado con éxito.',
      timer: 2000,
      showConfirmButton: false,
    });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
  eliminarValoracion(id: number) {
    const token = this.authToken ?? '';
    this.valoracionesService.eliminarValoracion(id, token).subscribe({
      next: (response) => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: '¡Valoración eliminada!',
          text: 'La valoración se ha eliminado con éxito.',
          timer: 2000,
          showConfirmButton: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      error: (error) => {
        console.log('Hubo un error al intentar eliminar la valoración.');
        console.error(error);
      },
    });
  }
}
