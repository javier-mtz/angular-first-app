import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { data } from '../../../assets/data/info';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { BreadcrumbsService } from '../../breadcrumbs.service';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-info-car',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule, CommonModule, RouterModule, BreadcrumbsComponent,MatToolbarModule,MatCardModule ],
  providers: [BreadcrumbsService],
  templateUrl: './info-car.component.html',
  styleUrl: './info-car.component.css'
})

export class InfoCarComponent implements OnInit {
  [x: string]: any;
  brand: string = ''; // Inicializando la propiedad brand
  infoCar: string = ''; // Inicializando la propiedad brand
  filteredData: any; // Suponiendo que filteredData es donde tienes almacenada la información del carro

  carroSeleccionado: Carro = {
    modelo: '',
    descripcion: '',
    precio: '',
    motor: '',
    imagenes: []
  };

  marca: string = '';

  imagenSeleccionada: string = '';
  imagenSeleccionadaIndex: number = 0;

  constructor(private route: ActivatedRoute, private breadcrumbsService: BreadcrumbsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const modelo = params['modelo'];
      for (let i = 0; i < data.length; i++) {
        const carrosFiltrados = data[i].carros.filter(carro => carro.modelo === modelo);
        this.marca = data[i].marca;
        if (carrosFiltrados.length > 0) {
          this.carroSeleccionado = carrosFiltrados[0];
          // Establecer la imagen seleccionada por defecto
          this.imagenSeleccionada = this.carroSeleccionado.imagenes[0];
          break;
        }
      }
    });

    // Establece las migas de pan para este componente
    this.breadcrumbsService.setBreadcrumbs([
      { label: 'Home', url: '/home' },
      { label: 'Brands', url: '/brands' },
      { label: this.marca, url: `/profile/${this.marca}` },
      { label: this.carroSeleccionado.modelo, url: `/brands/${this.marca}/${this.carroSeleccionado.modelo}` }
    ]);
  }

  seleccionarImagen(imagen: string, index: number) {
    // Actualizar la imagen seleccionada y su índice
    this.imagenSeleccionada = imagen;
    this.imagenSeleccionadaIndex = index;
  }
}
interface Carro {
  modelo: string;
  descripcion: string;
  precio: string;
  motor: string;
  imagenes: string[];
}