import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CartProduct } from '../models/product';
import { PedidosService } from '../pedidos.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {
  cartItems: CartProduct[] = [];
  totalPrice: number = 0;
  pedidoExitoso: boolean = false;
  pedidoItems: CartProduct[] = [];
  pedidoTotal: number = 0;
  perfilUsuario: any = {};




  constructor(private cartService: CartService, private pedidosService: PedidosService) { }

  ngOnInit(): void {
    this.perfilUsuario = JSON.parse(sessionStorage.getItem('usuario') || '{}');

    this.cartService.articulosActualesCarrito.subscribe(items => {
      this.cartItems = items;
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }

  increaseQuantity(item: CartProduct): void {
    if (item.cantidad < item.stock) {
      item.cantidad++;
      this.cartService.updateCartItem(item);
      this.calculateTotalPrice();
    }
  }

  decreaseQuantity(item: CartProduct): void {
    if (item.cantidad > 1) {
      item.cantidad--;
      this.cartService.updateCartItem(item);
      this.calculateTotalPrice();
    }
  }


  updateCartItem(item: CartProduct): void {
    this.cartService.añadirProductoAlCarrito(item);
    this.calculateTotalPrice();
  }
  removeProduct(productId: number): void {
    this.cartService.eliminarProductoDelCarrito(productId);
  }

  clearCart(): void {
    this.cartService.limpiarCarrito();
  }
  getTallaId(talla: string): number {
    const tallasMap: { [key: string]: number } = { 'S': 1, 'M': 2, 'L': 3, 'XL': 4 };
    return tallasMap[talla] || 0;
  }
  placeOrder(): void {
    const orderDetails = {
      items: this.cartItems.map(item => ({
        id: item.id,
        nombre: item.nombre,
        talla_id: this.getTallaId(item.talla),
        imagen: item.imagen,
        cantidad: item.cantidad,
        precio: item.precio
      })),
      total: this.totalPrice,
      customerEmail: this.perfilUsuario.email
    };

    this.pedidosService.sendOrderDetails(orderDetails).subscribe(
      response => {
        console.log('Pedido enviado:', response);
        this.pedidoExitoso = true;
        this.pedidoItems = [...this.cartItems];
        this.pedidoTotal = this.totalPrice;
        this.clearCart();
      },
      error => {
        console.error('Error al enviar el pedido:', error);
        alert('Hubo un problema al procesar su pedido. Intente de nuevo.');
      }
    );
  }
}
