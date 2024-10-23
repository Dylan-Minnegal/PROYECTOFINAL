import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products.service';
import { CartProduct, Producto, NuevoProducto } from '../models/product';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.sass']
})
export class PanelAdminComponent implements OnInit {
  productos: Producto[] = [];
  mostrarFormulario: boolean = false;
  tallas: string[] = ['S', 'M', 'L', 'XL'];
  tallasConId = [
    { id: 1, talla: 'S' },
    { id: 2, talla: 'M' },
    { id: 3, talla: 'L' },
    { id: 4, talla: 'XL' },
  ];

  categorias: string[] = ['Camisetas', 'Pantalones', 'Faldas', 'Zapatillas', 'Accesorios'];
  sexos: string[] = ['Hombre', 'Mujer', 'Unisex'];
  nuevaTalla: string = '';
  nuevaCantidad: number = 1;
  nuevoProducto: NuevoProducto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    color: '',
    imagen: '',
    sexo: '',
    categoria: '',
    tallas: []
  };




  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  abrirFormulario(): void {
    this.mostrarFormulario = true;
  }
  cancelar(): void {
    this.mostrarFormulario = false;
    this.resetearNuevoProducto();
  }
  resetearNuevoProducto(): void {
    this.nuevoProducto = {
      nombre: '',
      descripcion: '',
      precio: 0,
      color: '',
      imagen: '',
      sexo: '',
      categoria: '',
      tallas: []
    };
  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.nuevoProducto.imagen = reader.result as string;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }
  guardarProducto(form: NgForm): void {
    if (form.valid) {
      const tallaSeleccionada = this.tallasConId.find(t => t.talla === this.nuevaTalla);

      if (tallaSeleccionada) {
        this.nuevoProducto.tallas.push({
          id: tallaSeleccionada.id,
          cantidad: this.nuevaCantidad
        });
      }

      this.productService.anadirProducto(this.nuevoProducto).subscribe(() => {
        this.cancelar();
        window.location.reload();
      }, error => {
        console.error('Error al añadir el producto:', error);
      });
    } else {
      console.error('El formulario no es válido');
    }
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
