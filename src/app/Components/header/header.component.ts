import { Component, OnInit, Input, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { data } from '../../../assets/data/info';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, CommonModule, MatMenuModule, RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  @Input() currentComponent: string = 'CarHistory';
  @Input() class: Array<string> = [];
  @Input() userButton: boolean = false;

  headerColor: string = '';
  logo: string = '';
  textColor: string = '';
  
  menuItems: any[] = [
    { name: 'Profile', route: '/profile', type: 'profile'},
    { name: 'logout', type: 'logout'}
  ];


  filteredData: any[] | undefined = []; 
  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {

    if (this.class.length > 0) {
      this.headerColor = this.class[0]; 
      if (this.headerColor === '#000000') {
        this.textColor = '#ffffff';
      } else {
        this.textColor = '#000000';
      }
      this.logo = this.class[1];
    } else {
      this.headerColor = '#333';
      this.logo = '';
      this.textColor = '#ffffff';
    }

    // ver si el usuario está logueado Y si es admin, para mostrar injectar el botón de admin al menú, al incio del menu
    if (this.authService.isAdmin()) {
      this.menuItems.unshift({ name: 'Admin', route: '/admin', type: 'admin'});
    }

  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  logout(): void {
    this.authService.logout();
  }

  goTo(route: string, type: string): void {
    if (type === 'logout') {
      this.authService.logout();
    } else {
      this.router.navigate([route]);
    }
  }


}
