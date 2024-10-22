import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../products.service';
import { Producto, Talla } from '../models/product'; // Asegúrate de importar la nueva interfaz

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.sass']
})
export class ActualizarProductoComponent implements OnInit {
  tallas: string[] = ['S', 'M', 'L', 'XL'];
  categorias: string[] = ['Camisetas', 'Pantalones', 'Faldas', 'Zapatillas', 'Accesorios'];
  sexos: string[] = ['Hombre', 'Mujer', 'Unisex'];
  sexoSeleccionado: string = '';
  categoriaSeleccionada: string = '';
  producto!: Producto;
  id!: number;
  nuevaTalla: string = '';
  nuevaCantidad: number = 1;
  nuevaCategoria: string = '';


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.cargarProducto();
  }

  cargarProducto(): void {
    this.productService.getProductoById(this.id).subscribe(data => {
      this.producto = data;
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.producto.imagen = reader.result as string;
      console.log('Imagen en Base64:', this.producto.imagen);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  agregarTalla(): void {
    if (this.nuevaTalla && this.nuevaCantidad > 0) {
      let tallaId: number;

      switch (this.nuevaTalla) {
        case 'S':
          tallaId = 1;
          break;
        case 'M':
          tallaId = 2;
          break;
        case 'L':
          tallaId = 3;
          break;
        case 'XL':
          tallaId = 4;
          break;
        default:
          alert('Talla no válida');
          return;
      }

      const tallaExistente = this.producto.tallas.find(talla => talla.id === tallaId);

      if (tallaExistente) {
        tallaExistente.pivot.cantidad += this.nuevaCantidad;
      } else {
        const nuevaTallaObj: Talla = {
          id: tallaId,
          talla: this.nuevaTalla,
          pivot: {
            producto_id: this.producto.id,
            talla_id: tallaId,
            cantidad: this.nuevaCantidad
          }
        };

        this.producto.tallas.push(nuevaTallaObj);
      }

      this.nuevaTalla = '';
      this.nuevaCantidad = 1;
    } else {
      alert("Por favor, ingresa una talla válida y una cantidad mayor que 0.");
    }
  }

  actualizarCategoria(): void {
    this.producto.categoria = this.categoriaSeleccionada;
  }
  
  actualizarSexo(): void {
    this.producto.sexo = this.sexoSeleccionado;
  }



  guardarCambios(): void {
    const productoAActualizar = {
      id: this.producto.id,
      nombre: this.producto.nombre,
      descripcion: this.producto.descripcion,
      precio: this.producto.precio,
      color: this.producto.color,
      imagen: this.producto.imagen,
      sexo: this.producto.sexo,
      categoria: this.producto.categoria,
      tallas: this.producto.tallas.map(talla => ({
        id: talla.id,
        talla: talla.talla,
        cantidad: talla.pivot.cantidad,
        pivot: {
          producto_id: this.producto.id,
          talla_id: talla.id,
          cantidad: talla.pivot.cantidad
        }
      }))
    };

    console.log('Datos del producto a enviar:', productoAActualizar);

    this.productService.actualizarProducto(productoAActualizar).subscribe(() => {
      alert('Producto actualizado con éxito');
      this.router.navigate(['/admin']);
    }, error => {
      console.error('Error al actualizar el producto:', error);
    });
  }


}
