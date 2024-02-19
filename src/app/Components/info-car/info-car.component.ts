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
  
  carroSeleccionado: Carro = {
    modelo: '',
    descripcion: '',
    precio: '',
    motor: '',
    imagenes: []
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.filteredData = data; 

    this.route.params.subscribe(params => {
      const modelo = params['modelo'];
      for (let i = 0; i < data.length; i++) {
        const carrosFiltrados = data[i].carros.filter(carro => carro.modelo === modelo);
        if (carrosFiltrados.length > 0) {
          this.carroSeleccionado = carrosFiltrados[0];
          break;
        }
      }
    });
  }
}
interface Carro {
  modelo: string;
  descripcion: string;
  precio: string;
  motor: string;
  imagenes: string[];
}
