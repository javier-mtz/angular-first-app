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


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [RouterOutlet, MatSlideToggleModule, MatGridListModule, MatCardModule, MatToolbarModule, CommonModule, RouterModule ],
})
export class ProfileComponent implements OnInit {
  [x: string]: any;
  brand: string = ''; // Inicializando la propiedad brand
  infoCar: string = ''; // Inicializando la propiedad brand
  filteredData: any[] | undefined = []; 
  constructor(private route: ActivatedRoute) { }

  onCardClick(index: number) {
    console.log(`Card ${index} was clicked.`);
    //NavigationPreloadManager.navigate(['/profile', this.filteredData[index].marca]);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.brand = params['brand'];
      // Puedes acceder a this.brand aquí una vez que tenga un valor asignado
      if (this.brand) {
        this.filteredData = data.filter((data) => data.marca === this.brand);
      }
    });

    
  }
}

