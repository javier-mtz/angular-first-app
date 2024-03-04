import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  user?: any;
  constructor(private authService: AuthService) {
    this.authService.getCurrentAuthUser().subscribe((user) => {
      this.user = user;
    });
  }
  
  logout() {
    this.authService.logout();
  }
}
