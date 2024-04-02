import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormArray, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AlertService } from '../../Services/alertService/alert.service';
import { CarService } from '../../Services/carService/car.service';
import { BrandService } from '../../Services/brandService/brand.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-car-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatTooltipModule
  ],
  templateUrl: './car-dialog.component.html',
  styleUrl: './car-dialog.component.css'
})
export class CarDialogComponent implements OnInit {
  carForm: FormGroup;
  // el brand va a traer id y nombre
  brands: any[] = [];

  constructor(private fb: FormBuilder, private _alert: AlertService, private _car: CarService, private _brand: BrandService, private _dialogRef: MatDialogRef<CarDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.carForm = new FormGroup({
      model: new FormControl('', Validators.required), // [valor por defecto, validaciones
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      engine: new FormControl('', Validators.required),
      brand: new FormControl('', Validators.required),
      images: new FormArray([
        new FormControl('', Validators.required)
      ])
    });

  }

  ngOnInit() {
    this.getBrandsForSelect();
    if (this.data) {
      this._car.find(this.data.id).subscribe({
        next: (val: any) => {
          this.carForm.patchValue({
            model: val.model,
            description: val.description,
            price: val.price,
            engine: val.engine,
            brand: val.brandId.name
          });

          // Obtén la referencia al FormArray de imágenes
          const imagesArray = this.carForm.get('images') as FormArray;

          // Eliminar todas las imágenes existentes del formulario
          while (imagesArray.length) {
            imagesArray.removeAt(0);
          }

          // Iterar sobre las imágenes del carro y agregarlas al formulario
          for (const imageUrl of val.images) {
            imagesArray.push(this.fb.control(imageUrl, Validators.required));
          }
        },
        error: (err: any) => {
          this._alert.showToast('Error en el servidor, si el problema persiste contacte con el administrador', 'error');
        }
      });
    }
  }

  onSubmit() {
    if (this.carForm.valid) {
      const formValue = { ...this.carForm.value };
      if (this.data) {
        this._car.update({ _id: this.data.id, ...formValue }).subscribe({
          next: (val: any) => {
            this._alert.showAlert('Carro actualizado', 'success', 'success');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            this._alert.showToast('Error en el servidor, si el problema persiste contacte con el administrador', 'error');
          }
        });
      } else {
        this._car.create(formValue).subscribe({
          next: (val: any) => {
            this._alert.showAlert('Carro creado', 'success', 'success');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            this._alert.showToast('Error en el servidor, si el problema persiste contacte con el administrador', 'error');
          }
        });
      }
    } else {
      this._alert.showToast('Por favor, rellene todos los campos', 'info');
    }
  }

  get images(): FormArray {
    return this.carForm.get('images') as FormArray;
  }

  addImage() {
    this.images.push(
      new FormControl('', Validators.required)
    );
  }

  removeImage(index: number) {
    this.images.removeAt(index);
  }

  getBrandsForSelect() {
    this._brand.getAll().pipe(
      tap((brands: any[]) => {
        this.brands = brands.map((brand: any) => {
          return {
            id: brand._id!,
            name: brand.name
          };
        });
      }),
      switchMap(() => this.data && this.data.id ? this._car.find(this.data.id) : of(null))
    ).subscribe({
      next: (val: any) => {
        if(val){
          this.carForm.setValue({
            model: val.model,
            description: val.description,
            price: val.price,
            engine: val.engine,
            brand: val.brandId && val.brandId._id ? val.brandId._id : null,
            images: val.images
          });
        }
      },
      error: (err: any) => {
        console.error(err);
        this._alert.showToast('Error en el servidor, si el problema persiste contacte con el administrador', 'error');
      }
    });
  }

}
