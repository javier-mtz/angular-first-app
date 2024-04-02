import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { BrandService } from '../../Services/brandService/brand.service';
import { MatIconModule } from '@angular/material/icon';
import { Brand } from '../../Interfaces/brand';
import { Car } from '../../Interfaces/car';

import { MatCardModule } from '@angular/material/card';
import { CarService } from '../../Services/carService/car.service';

import { MatDialog } from '@angular/material/dialog';
import { CarInfoDialogComponent } from '../../Dialogs/car-info-dialog/car-info-dialog.component';

@Component({
  selector: 'app-rental-brands',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './rental-brands.component.html',
  styleUrl: './rental-brands.component.css'
})
export class RentalBrandsComponent {
  step = 1;
  brands: any[] = [];
  cars: any[] = [];

  constructor(private _brand: BrandService, private _car: CarService, private _dialog: MatDialog) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.step = 1;
    this._brand.brandsWithCars().subscribe((brands) => {
      this.brands = brands;
    });
  }

  selectBrand(brand: Brand) {
    this._car.getBrandCars(brand._id).subscribe((cars) => {
      this.cars = cars;
      this.step = 2;
    });
  }

  showCar(car: Car) {
    this._dialog.open(CarInfoDialogComponent, {
      data: car,
      width: '75%',
      height: '65%'
    });
  }
}
