import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ActivatedRoute, RouterModule } from '@angular/router'; // Asegúrate de importar RouterModule
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { data } from '../../../assets/data/info';
import { HeaderComponent } from '../header/header.component';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreadcrumbsService } from '../../Services/breadcrumbService/breadcrumbs.service';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-brands',
  standalone: true,
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
  imports: [MatGridListModule, RouterModule, CommonModule, MatCardModule, BreadcrumbsComponent, MatToolbarModule, HeaderComponent],
  providers: [BreadcrumbsService],
})
export class BrandsComponent implements OnInit {
  [x: string]: any;
  brand: string = ''; // Inicializando la propiedad brand
  data = data;

  constructor(private breadcrumbsService: BreadcrumbsService) { }

  ngOnInit() {

    // Establece las migas de pan para este componente
    this.breadcrumbsService.setBreadcrumbs([
      { label: 'Home', url: '/home' },
      { label: 'Brands', url: '/brands' }
    ]);
  }
}
