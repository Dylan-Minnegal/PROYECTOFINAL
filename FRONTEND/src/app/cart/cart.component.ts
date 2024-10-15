import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CartProduct } from '../models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {
  cartItems: CartProduct[] = []; 
  totalPrice: number = 0; 

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.currentCartItems.subscribe(items => {
      this.cartItems = items;
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }

  removeProduct(productId: number): void {
    this.cartService.removeProductFromCart(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
