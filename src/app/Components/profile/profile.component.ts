import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
import { data } from '../../../assets/data/info';
import { RouterModule } from '@angular/router';

import { BreadcrumbsService } from '../../Services/breadcrumbService/breadcrumbs.service';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [RouterOutlet, MatSlideToggleModule, MatGridListModule, MatCardModule, MatToolbarModule, CommonModule, RouterModule, BreadcrumbsComponent, HeaderComponent],
  providers: [BreadcrumbsService],
})
export class ProfileComponent implements OnInit {
  [x: string]: any;
  brand: string = ''; // Inicializando la propiedad brand
  filteredData: any[] | undefined = [];

  classHeader: Array<string> = [];

  constructor(private route: ActivatedRoute, private breadcrumbsService: BreadcrumbsService) { }
  onCardClick(index: number) {
    //NavigationPreloadManager.navigate(['/profile', this.filteredData[index].marca]);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.brand = params['brand'];
      // Puedes acceder a this.brand aquí una vez que tenga un valor asignado
      if (this.brand) {
        this.filteredData = data.filter((data) => data.marca === this.brand);
        if (this.filteredData.length > 0) {
          this.classHeader = [this.filteredData[0].paletaColores[0], this.filteredData[0].logo];
        }
      }
    });

    // Establece las migas de pan para este componente
    this.breadcrumbsService.setBreadcrumbs([
      { label: 'Home', url: '/home' },
      { label: 'Brands', url: '/brands' },
      { label: this.brand, url: `/brands/${this.brand}` }
    ]);
  }
}

