import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
  email: string = '';
  contrasena: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router, private AuthService: AuthService) {}

  onSubmit(): void {
    this.AuthService.login(this.email, this.contrasena).subscribe({
      next: (response: any) => {
        console.log('Inicio de sesión exitoso:', response);

        this.AuthService.storeSessionData(response.token, response.usuario);

        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      },
      error: () => {
        this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
      },
    });
  }
}
