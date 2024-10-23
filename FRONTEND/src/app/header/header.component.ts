import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  usuario: any = null;
  rolUsuario: boolean = false; 
  cartItemCount: number = 0;


  constructor(private router: Router, private AuthService: AuthService, private cartService: CartService) {}

  ngOnInit(): void {
    const usuarioString = sessionStorage.getItem('usuario');

    if (usuarioString) {
      this.usuario = JSON.parse(usuarioString); 
      this.rolUsuario = this.usuario.rol === 'admin'; 
    }
    this.cartService.cantidadActualCarrito.subscribe(count => {
      this.cartItemCount = count;
    });
  }

  logout(): void {
    this.AuthService.logout();
  }
}
