import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { RouterModule } from '@angular/router'; // Asegúrate de importar RouterModule


@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [MatGridListModule, RouterModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {

}
