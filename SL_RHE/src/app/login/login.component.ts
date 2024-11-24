import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export default class LoginComponent {
  email: string = '';
  password: string = '';
  isEmailValid: boolean = false;
  showLoginError: boolean = false;
  errorMessage: string = ''; 
  isLoginSuccess: boolean = false;

  constructor(private router: Router) {}

  // Nuevo método para manejar cambios en el correo
  onEmailChange() {
    this.isEmailValid = this.isValidEmail(this.email);
  }

  // Nuevo método para manejar cambios en la contraseña
  onPasswordChange() {
    // Validación de longitud de contraseña
    this.password = this.password.trim();
  }

  async login() {
    // Validación final antes del login
    this.isEmailValid = this.isValidEmail(this.email);

    const URLServicio = 'http://localhost:3000/login';
    const Respuesta = await fetch(URLServicio,
        {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              'password': this.password, 
              'email': this.email
            })
        });

    //Se traduce la respuesa a un objeto
    const Resultado = await Respuesta.json();

    const matchingAccount = Resultado.match;

    if (matchingAccount) {
      this.errorMessage = 'Bienvenido al reporte de horas extras de Santa Lucia';
      this.isLoginSuccess = true;
      this.showLoginError = true;
      setTimeout(() => {
        this.showLoginError = false;
        this.router.navigate(['/formato']);
      }, 4000);
    } else {
      this.errorMessage = 'Correo electrónico o contraseña incorrectos. Por favor, vuelve a intentarlo.';
      this.isLoginSuccess = false;
      this.showLoginError = true;
      setTimeout(() => {
        this.showLoginError = false;
      }, 4000);
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }
}