import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
  email: string = '';
  contrasena: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    const url = 'http://api.daw/api/login'; // URL de tu API de inicio de sesión
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email: this.email, password: this.contrasena }; 
    console.log(body);
        

    this.http.post(url, body, { headers }).subscribe({
      next: (response: any) => {
        console.log('Inicio de sesión exitoso:', response);



        localStorage.setItem('authToken', response.token); 
        localStorage.setItem('usuario', JSON.stringify(response.usuario));

        this.router.navigate(['/']).then(() => {
          window.location.reload(); // Recargar la página principal
        });

      },
      error: (error) => {
        this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
      },
    });
  }
}
