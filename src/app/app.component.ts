import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FooterComponent } from '../app/Components/footer/footer.component';
import { HeaderComponent } from '../app/Components/header/header.component';
import { CommonService } from '../app/common.service';
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
  ip = '';
  constructor(private router: Router, private commonService: CommonService) {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    });
    this.commonService.getIPAddress().subscribe((res: any) => {
      console.log(res);
      this.ip = res.ip;
    });
  }
}
