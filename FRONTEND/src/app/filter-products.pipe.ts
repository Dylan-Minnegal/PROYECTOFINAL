import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from './models/product'; // Ajusta la ruta según sea necesario

@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {

  transform(productos: Producto[], searchText: string): Producto[] {
    if (!productos || !searchText) {
      return productos;
    }

    const lowerCaseSearchText = searchText.toLowerCase();

    return productos.filter(producto => {
      return producto.nombre.toLowerCase().includes(lowerCaseSearchText);
    });
  }
}
