import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/authService/auth.service';
import { UserDialogComponent } from '../../Dialogs/user-dialog/user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from '../../Dialogs/auth-dialog/auth-dialog.component';

import { Router } from '@angular/router';
import { CarService } from '../../Services/carService/car.service';
import { AlertService } from '../../Services/alertService/alert.service';
import { CarInfoDialogComponent } from '../../Dialogs/car-info-dialog/car-info-dialog.component';
import { Car } from '../../Interfaces/car';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    HeaderComponent,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    CommonModule,
    MatInputModule,
    MatSelectModule,
    FlexLayoutModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  user: any = {};
  cars: any[] = [];

  constructor(
    private _auth: AuthService,
    private _dialog: MatDialog,
    private router: Router,
    private _car: CarService,
    private _alert: AlertService
  ) {
    this._auth.getCurrentAuthUser().subscribe((user) => {
      if (user === null) {
        this.router.navigate(['/login']);
        return;
      }
      this.user = user;
      this.user.publicIp = this.user.publicIp.reverse();
      this._car.findCarbyUser(this.user._id).subscribe((car) => {
        if (car === null) {
          return;
        }
        this.cars = car;
      });
      if (user.oneTimePassword !== undefined && user.oneTimePassword) {
        this.changeMailPassword();
      }
    });
  }

  updateUser() {
    const dialogRef = this._dialog.open(UserDialogComponent, {
      data: {
        id: this.user._id,
        editable: false,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this._auth.getCurrentAuthUser().subscribe((user) => {
          if (user === null) {
            this.router.navigate(['/login']);
            return;
          }
          this.user = user;
        });
      },
    });
  }

  changePassword() {
    const dialogRef = this._dialog.open(AuthDialogComponent, {
      data: {
        id: this.user._id,
      },
      disableClose: true,
    });
  }

  changeMailPassword() {
    const dialogRef = this._dialog.open(AuthDialogComponent, {
      data: {
        id: this.user._id,
        newPassword: true,
      },
      disableClose: true,
    });
  }

  validateReturnCar(event: any, car: any) {
    event.stopPropagation(); // Detiene la propagación del evento
    this._alert.showConfirmAlert(
      'Devolver coche',
      '¿Estás seguro de que deseas devolver el coche?',
      'info',
      'Devolver',
      'Cancelar',
      () => {
        this.returnCar(car);
      }
    );
  }

  returnCar(car: any) {
    this._car.returnCar(car._id).subscribe((res) => {
      this._car.findCarbyUser(this.user._id).subscribe((car) => {
        this.cars = car;
      });
      this._alert.showToast('Coche devuelto', 'success');
    });
  }

  showCar(car: Car) {
    const dialogRef = this._dialog.open(CarInfoDialogComponent, {
      data: car,
      width: '75%',
      height: '65%'
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this._car.findCarbyUser(this.user._id).subscribe((car) => {
          this.cars = car;
        });
      },
    });
  }

  ngOnInit(): void {}
}
