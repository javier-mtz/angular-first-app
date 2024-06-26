import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FooterComponent } from '../app/Components/footer/footer.component';
import { HeaderComponent } from '../app/Components/header/header.component';
import { CommonService } from './Services/getApiService/common.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
    HttpClientModule,
  ],
})
export class AppComponent {
  title = 'CarHistory';
  constructor(private router: Router) {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    });
  }
}
