import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuarios-service.service'; 



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {
  usuario = {
    nombre: '',
    apellidos: '',
    direccion: '',
    email: '',
    password: '',
    password_confirmation: ''
  };
  submitted = false;

  constructor(private UsuarioService: UsuarioService, private router: Router) {}

  get passwordsMatch(): boolean {
    return this.usuario.password === this.usuario.password_confirmation;
  }

  onSubmit(registerForm: NgForm) {
    this.submitted = true;

    if (!this.passwordsMatch || registerForm.invalid) {
      return;
    }

    this.UsuarioService.registrarUsuario(this.usuario).subscribe({
      next: (response) => {
        console.log('Usuario registrado con éxito:', response);
        this.router.navigate(['/login']); 
      },
      error: (error) => {
        console.error('Error en el registro:', error);
      }
    });
  }
}
