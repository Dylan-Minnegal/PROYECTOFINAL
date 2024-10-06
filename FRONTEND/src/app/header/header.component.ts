import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  usuario: any = null; 

  constructor(private router: Router) {}

  ngOnInit(): void {
    const usuarioString = localStorage.getItem('usuario');

    if (usuarioString) {
      this.usuario = JSON.parse(usuarioString); 
      console.log('Usuario recuperado:', this.usuario);
    } else {
      console.log('Error al recuperar usuario de localStorage');
    }
  }

  logout(): void {
    localStorage.removeItem('authToken'); 
    localStorage.removeItem('usuario'); 
    window.location.reload()
  }
}
