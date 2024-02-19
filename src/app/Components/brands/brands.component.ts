import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { ActivatedRoute, RouterModule } from '@angular/router'; // Asegúrate de importar RouterModule
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { data } from '../../../assets/data/info';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
    selector: 'app-brands',
    standalone: true,
    templateUrl: './brands.component.html',
    styleUrl: './brands.component.css',
    imports: [MatGridListModule, RouterModule, CommonModule, MatCardModule]
})
export class BrandsComponent{
  [x: string]: any;
  brand: string = ''; // Inicializando la propiedad brand
  data = data;
}
