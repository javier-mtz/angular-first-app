import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { data } from '../../../assets/data/info';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-car',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule, CommonModule, RouterModule],
  templateUrl: './info-car.component.html',
  styleUrl: './info-car.component.css'
})
export class InfoCarComponent implements OnInit {
  filteredData: any; // Suponiendo que filteredData es donde tienes almacenada la información del carro

  logoUrl?: string; // Variable para almacenar la URL del logo

  infoCar: string = ''; // Inicializando la propiedad brand

  model: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.filteredData = data; 

    this.route.params.subscribe(params => {
      const modelo = params['modelo'];
      console.log(modelo);
      
      if (this.model) {
        this.filteredData = data.filter((data) => data.marca === this.model);
      }

    });
  }
}
