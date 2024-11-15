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
  errorMessage = "";
  contrasenasCoinciden: boolean = true; 
  contrasenaValida: boolean = true; 

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  verificarContrasenas(): void {
    this.contrasenasCoinciden = this.usuario.password === this.usuario.password_confirmation;
  }

  verificarContrasenaValida(): void {
    const password = this.usuario.password;
    const hasUpperCase = /[A-Z]/.test(password); 
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); 
    this.contrasenaValida = password.length >= 8 && hasUpperCase && hasSpecialChar;
  }

  onSubmit(registerForm: NgForm) {
    this.submitted = true;

    if (!this.contrasenasCoinciden || !this.contrasenaValida || registerForm.invalid) {
      return; 
    }

    this.usuarioService.registrarUsuario(this.usuario).subscribe({
      next: (response) => {
        console.log('Usuario registrado con éxito:', response);
        this.router.navigate(['/login']); 
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      }
    });
  }
}
