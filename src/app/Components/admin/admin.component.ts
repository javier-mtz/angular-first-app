import { Component, inject } from '@angular/core';
import { AuthService } from '../../Services/authService/auth.service';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { HeaderComponent } from '../header/header.component';
import { BreadcrumbsService } from '../../Services/breadcrumbService/breadcrumbs.service';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDivider } from '@angular/material/divider';

import { CarListComponent } from '../../Lists/car-list/car-list.component';
import { BrandListComponent } from '../../Lists/brand-list/brand-list.component';
import { UserListComponent } from '../../Lists/user-list/user-list.component';
import { CommonModule } from '@angular/common';
import { User } from '../../Interfaces/user';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    HeaderComponent,
    BreadcrumbsComponent,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    CarListComponent,
    BrandListComponent,
    UserListComponent,
    CommonModule,
    MatDivider,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  user?: User;

  constructor(private authService: AuthService, private breadcrumbsService: BreadcrumbsService) {

    this.breadcrumbsService.setBreadcrumbs([
      { label: 'Home', url: '/home' },
      { label: 'Admin', url: '/admin' },
    ]);

    this.authService.getCurrentAuthUser().subscribe((user) => {
      this.user = user;
    });

  }

  isAdmin() {
    return true;
  }

}
