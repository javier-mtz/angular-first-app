import { Component, OnInit } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { ActivatedRoute, RouterModule } from '@angular/router'; // Asegúrate de importar RouterModule
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { data } from '../../../assets/data/info';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';



import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreadcrumbsService } from '../../breadcrumbs.service';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';

@Component({
    selector: 'app-brands',
    standalone: true,
    templateUrl: './formulario.component.html',
    styleUrl: './formulario.component.css',
    imports: [MatFormFieldModule, MatGridListModule, RouterModule, CommonModule, MatCardModule, BreadcrumbsComponent, MatToolbarModule, MatCheckboxModule],
    providers: [BreadcrumbsService], 
})

export class FormularioComponent implements OnInit{
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
