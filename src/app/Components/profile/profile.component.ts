import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [RouterOutlet, MatSlideToggleModule, MatGridListModule, MatCardModule, MatToolbarModule, CommonModule],
})
export class ProfileComponent implements OnInit {
  brand: string = ''; // Inicializando la propiedad brand

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.brand = params['brand'];
      // Puedes acceder a this.brand aquí una vez que tenga un valor asignado
      if (this.brand) {
        // Hacer algo con this.brand
      }
    });
  }
}
