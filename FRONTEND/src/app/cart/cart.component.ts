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



  constructor(private cartService: CartService, private pedidosService: PedidosService) {}

  ngOnInit(): void {
    this.cartService.articulosActualesCarrito.subscribe(items => {
      this.cartItems = items;
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }

  removeProduct(productId: number): void {
    this.cartService.eliminarProductoDelCarrito(productId);
  }

  clearCart(): void {
    this.cartService.limpiarCarrito();
  }
  getTallaId(talla: string): number {
    const tallasMap: { [key: string]: number } = { 'S': 1, 'M': 2, 'L': 3, 'XL': 4};
    return tallasMap[talla] || 0; 
  }
  placeOrder(): void {
    const orderDetails = {
      items: this.cartItems.map(item => ({
        id: item.id,
        nombre: item.nombre,
        talla_id: this.getTallaId(item.talla),
        cantidad: item.cantidad,
        precio: item.precio
      })),
      total: this.totalPrice,
      customerEmail: 'dylaminnegal@gmail.com' 
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
