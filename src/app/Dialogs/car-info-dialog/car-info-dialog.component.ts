import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CarService } from '../../Services/carService/car.service';
import { AuthService } from '../../Services/authService/auth.service';
import { User } from '../../Interfaces/user';
import { AlertService } from '../../Services/alertService/alert.service';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-car-info-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule
  ],
  templateUrl: './car-info-dialog.component.html',
  styleUrl: './car-info-dialog.component.css'
})
export class CarInfoDialogComponent implements OnInit {

  car = {} as any;
  user = {} as User;
  buttonTitle: string = 'Rentar';
  disabled: boolean = false;
  imagenSeleccionada: string = '';
  imagenSeleccionadaIndex: number = 0;
  disabledButton: boolean = false;

  constructor(private _dialogRef: MatDialogRef<CarInfoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _car: CarService, private _auth: AuthService, private _alert: AlertService) {
  }

  ngOnInit() {
    if (this.data) {
      this._auth.getCurrentAuthUser().subscribe((userRes) => {
        this.user = userRes;
        this._car.find(this.data._id).subscribe((res) => {
          this.car = res;
          this.imagenSeleccionada = this.car.images[0];
          if (this.car.images.length <= 1) {
            this.disabledButton = true;
          } else {
            this.disabledButton = false;
          }

          if (this.car.busy) {
            if (this.car.userId === this.user._id) {
              this.buttonTitle = 'Devolver';
              this.disabled = false;
            } else {
              this.buttonTitle = 'Ocupado';
              this.disabled = true;
            }
          } else {
            this.buttonTitle = 'Rentar';
            this.disabled = false;
          }
        });
      });
    }
  }

  validateButton() {
    if (this.buttonTitle === 'Rentar') {
      this.rentCar();
    } else {
      this.returnCar();
    }
  }

  rentCar() {
    this._car.rentCar(this.user._id, this.car._id).subscribe((res) => {
      this._alert.showToast('Carro rentado con éxito', 'success');
      this._dialogRef.close();
    });
  }

  returnCar() {
    this._car.returnCar(this.car._id).subscribe((res) => {
      this._alert.showToast('Carro devuelto con éxito', 'success');
      this._dialogRef.close();
    });
  }

  seleccionarImagen(imagen: string, index: number) {
    // Actualizar la imagen seleccionada y su índice
    this.imagenSeleccionada = imagen;
    this.imagenSeleccionadaIndex = index;
  }

  imagenSiguiente() {
    // Verificar si hay una siguiente imagen disponible
    if (this.imagenSeleccionadaIndex < this.car.images.length - 1) {
      // Cambiar a la siguiente imagen
      this.imagenSeleccionadaIndex++;
      this.imagenSeleccionada = this.car.images[this.imagenSeleccionadaIndex];
    } else {
      // Cambiar a la primera imagen
      this.imagenSeleccionadaIndex = 0;
      this.imagenSeleccionada = this.car.images[this.imagenSeleccionadaIndex];
    }
  }

  imagenAnterior() {
    // Verificar si hay una imagen anterior disponible
    if (this.imagenSeleccionadaIndex > 0) {
      // Cambiar a la imagen anterior
      this.imagenSeleccionadaIndex--;
      this.imagenSeleccionada = this.car.images[this.imagenSeleccionadaIndex];
    } else {
      // Cambiar a la última imagen
      this.imagenSeleccionadaIndex = this.car.images.length - 1;
      this.imagenSeleccionada = this.car.images[this.imagenSeleccionadaIndex];
    }
  }
}
