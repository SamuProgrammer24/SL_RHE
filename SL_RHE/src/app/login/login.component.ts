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
  isEmailValid: boolean = true;
  showLoginError: boolean = false;
  errorMessage: string = ''; // Mensaje de error o éxito
  isLoginSuccess: boolean = false; // Flag para determinar si el login fue exitoso

  constructor(private router: Router) {}

  login() {
    this.isEmailValid = this.isValidEmail(this.email);

    const testAccounts = [
      { email: '123@ejemplo.com', password: 'samuel' },
      { email: 'osl@ejemplo.com', password: 'OSL2024' },
      { email: 'sl2024@ejemplo.com', password: 'santalucia' }
    ];

    const matchingAccount = testAccounts.find(
      account => account.email === this.email && account.password === this.password
    );

    if (matchingAccount) {
      // Si las credenciales son correctas
      this.errorMessage = 'Bienvenido al reporte de horas extras de Santa Lucia';
      this.isLoginSuccess = true; // El login fue exitoso
      this.showLoginError = true; // Mostrar el mensaje
      setTimeout(() => {
        this.showLoginError = false;  // Ocultar el mensaje después de 4 segundos
        // Navegar después de ocultar el mensaje
        this.router.navigate(['/formato']);
      }, 4000);  // 4 segundos
    } else {
      // Si las credenciales no son correctas
      this.errorMessage = 'Correo electrónico o contraseña incorrectos. Por favor, vuelve a intentarlo.';
      this.isLoginSuccess = false; // El login falló
      this.showLoginError = true;  // Mostrar el mensaje de error
      setTimeout(() => {
        this.showLoginError = false;  // Ocultar el mensaje después de 4 segundos
        // Navegar después de ocultar el mensaje
        this.router.navigate(['/formato']);
      }, 4000);  // 4 segundos
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
