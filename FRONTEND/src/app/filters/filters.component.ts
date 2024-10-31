import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.sass']
})
export class FiltersComponent {
  categorias: string[] = ['Camisetas', 'Pantalones', 'Faldas', 'Chaquetas', 'Sudaderas'];
  sexos: string[] = ['Hombre', 'Mujer', 'Unisex'];
  tallas: string[] = ['S', 'M', 'L', 'XL'];
  
  sexosSeleccionados: string[] = [];
  categoriasSeleccionadas: string[] = [];
  tallasSeleccionadas: string[] = []; 
  
  minPrice: number = 0;
  maxPrice: number = 10000000; 
  
  @Output() filterChange = new EventEmitter<{
    categorias: string[],
    sexos: string[],
    tallas: string[], 
    minPrice: number,
    maxPrice: number
  }>();

  onCategoriaChange(categoria: string, event: any) {
    if (event.target.checked) {
      this.categoriasSeleccionadas.push(categoria);
    } else {
      const index = this.categoriasSeleccionadas.indexOf(categoria);
      if (index > -1) {
        this.categoriasSeleccionadas.splice(index, 1);
      }
    }
    this.emitFilters();
  }

  onSexoChange(sexo: string, event: any) {
    if (event.target.checked) {
      this.sexosSeleccionados.push(sexo);
    } else {
      const index = this.sexosSeleccionados.indexOf(sexo);
      if (index > -1) {
        this.sexosSeleccionados.splice(index, 1);
      }
    }
    this.emitFilters();
  }

  onTallaChange(talla: string, event: any) {
    if (event.target.checked) {
      this.tallasSeleccionadas.push(talla);
    } else {
      const index = this.tallasSeleccionadas.indexOf(talla);
      if (index > -1) {
        this.tallasSeleccionadas.splice(index, 1);
      }
    }
    this.emitFilters();
  }

  onPriceChange() {
    this.emitFilters();
  }

  emitFilters() {
    this.filterChange.emit({
      categorias: this.categoriasSeleccionadas,
      sexos: this.sexosSeleccionados,
      tallas: this.tallasSeleccionadas,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    });
  }
}
