import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  usuario: any = null; 

  constructor(private router: Router, private AuthService: AuthService) {}

  ngOnInit(): void {
    const usuarioString = sessionStorage.getItem('usuario');

    if (usuarioString) {
      this.usuario = JSON.parse(usuarioString); 
    }
  }

  logout(): void {
    this.AuthService.logout();
  }
}
