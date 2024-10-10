import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuarios-service.service'; // Importar el servicio



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

    // Verificar si las contraseñas coinciden antes de enviar el formulario
    if (!this.passwordsMatch || registerForm.invalid) {
      return;
    }

    // Llamar al servicio para registrar el usuario
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
