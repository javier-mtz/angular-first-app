import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { RouterModule } from '@angular/router'; // Asegúrate de importar RouterModule

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [MatGridListModule, RouterModule, MatSlideToggleModule, MatCardModule, MatToolbarModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {

}
