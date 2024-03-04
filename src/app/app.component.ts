import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FooterComponent } from '../app/Components/footer/footer.component';
import { HeaderComponent } from '../app/Components/header/header.component';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    MatSlideToggleModule,
    FooterComponent,
    FooterComponent,
    HeaderComponent,
  ],
})
export class AppComponent {
  authService = inject(AuthService);
  title = 'CarHistory';
  user?: any;
  constructor(private router: Router) {
    this.authService
      .login({ username: 'Admin', password: '123' })
      .subscribe((r) => {
        this.authService.getCurrentAuthUser().subscribe((r) => {
          console.log(r);
          this.user = r;
        });
      });
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
      // cuando sea la ruta / redirigir a /home
      if (evt.url === '/') {
        this.router.navigate(['/home']);
      }
    });
  }
}
