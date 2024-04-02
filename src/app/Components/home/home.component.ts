import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) { }

  navigateToBrands() {
    this.router.navigate(['/brands']);
  }

  navigateToRental() {
    this.router.navigate(['/rental']);
  }
}
