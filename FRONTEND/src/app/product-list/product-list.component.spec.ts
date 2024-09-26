import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../products.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    // Crea un espía para el ProductService
    productService = jasmine.createSpyObj('ProductService', ['fetchProductos']);
    
    await TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      providers: [
        { provide: ProductService, useValue: productService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch products on init', () => {
    const productosMock = [
      { id: 1, nombre: 'Producto 1', descripcion: 'Descripción 1', precio: 100, color: 'Rojo', imagen: 'imagen1.png', tallas: [] },
      { id: 2, nombre: 'Producto 2', descripcion: 'Descripción 2', precio: 200, color: 'Azul', imagen: 'imagen2.png', tallas: [] }
    ];
    
    productService.fetchProductos.and.returnValue(of(productosMock)); // Simula el retorno del servicio

    component.ngOnInit(); // Llama al método ngOnInit para activar la carga de productos

    expect(component.productos).toEqual(productosMock); // Verifica que los productos se hayan almacenado correctamente
  });

  it('should display products in the template', () => {
    const productosMock = [
      { id: 1, nombre: 'Producto 1', descripcion: 'Descripción 1', precio: 100, color: 'Rojo', imagen: 'imagen1.png', tallas: [] },
      { id: 2, nombre: 'Producto 2', descripcion: 'Descripción 2', precio: 200, color: 'Azul', imagen: 'imagen2.png', tallas: [] }
    ];
    
    productService.fetchProductos.and.returnValue(of(productosMock)); // Simula el retorno del servicio

    component.ngOnInit(); // Llama al método ngOnInit

    fixture.detectChanges(); // Actualiza la vista

    const productElements = fixture.debugElement.queryAll(By.css('.product')); // Asume que cada producto tiene una clase .product

    expect(productElements.length).toBe(2); // Verifica que se muestren dos productos
    expect(productElements[0].nativeElement.textContent).toContain('Producto 1'); // Verifica el nombre del primer producto
    expect(productElements[1].nativeElement.textContent).toContain('Producto 2'); // Verifica el nombre del segundo producto
  });
});
