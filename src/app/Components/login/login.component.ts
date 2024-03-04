import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  authService = inject(AuthService);
  router = inject(Router)

  login(event: Event) {
    event.preventDefault();
    this.authService.login({ username: this.username, password: this.password }).subscribe(() => {
      this.router.navigate(['/admin']);
    });
  }
}
