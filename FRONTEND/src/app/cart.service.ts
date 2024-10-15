import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartProduct } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemCount = new BehaviorSubject<number>(0);
  currentCartCount = this.cartItemCount.asObservable();

  private cartItems = new BehaviorSubject<CartProduct[]>([]);
  currentCartItems = this.cartItems.asObservable();

  constructor() {}

  addProductToCart(product: CartProduct): void {
    let currentItems = this.cartItems.value;

    const itemIndex = currentItems.findIndex(item => item.id === product.id && item.talla === product.talla);

    if (itemIndex !== -1) {
      currentItems[itemIndex].cantidad += product.cantidad;
    } else {
      currentItems.push({ ...product, cantidad: product.cantidad });
    }

    this.cartItems.next(currentItems);
    this.updateUniqueProductCount(); 
  }

  private updateUniqueProductCount(): void {
    const uniqueProductCount = this.cartItems.value.length;
    this.cartItemCount.next(uniqueProductCount);
  }

  getCartItems(): CartProduct[] {
    return this.cartItems.value;
  }

  removeProductFromCart(productId: number): void {
    let currentItems = this.cartItems.value;

    currentItems = currentItems.filter(item => item.id !== productId);

    this.cartItems.next(currentItems);
    this.updateUniqueProductCount();
  }

  clearCart(): void {
    this.cartItems.next([]);
    this.updateUniqueProductCount();
  }
}
