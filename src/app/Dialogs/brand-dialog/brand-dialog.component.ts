import { Component, Inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AlertService } from '../../Services/alertService/alert.service';
import { BrandService } from '../../Services/brandService/brand.service';

@Component({
  selector: 'app-brand-dialog',
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
    FlexLayoutModule
  ],
  templateUrl: './brand-dialog.component.html',
  styleUrl: './brand-dialog.component.css'
})
export class BrandDialogComponent {
  brandForm: FormGroup;

  constructor(private fb: FormBuilder, private _alert: AlertService, private _brand: BrandService, private _dialogRef: MatDialogRef<BrandDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.brandForm = this.fb.group({
      name: [''],
      color: [''],
      logo: ['']
    });
    // los campos del formulario son requeridos
    this.brandForm.controls['name'].setValidators([Validators.required]);
    this.brandForm.controls['color'].setValidators([Validators.required]);
    this.brandForm.controls['logo'].setValidators([Validators.required]);
  }

  ngOnInit() {
    if (this.data) {
      this._brand.find(this.data.id).subscribe({
        next: (val: any) => {
          this.brandForm.setValue({
            name: val.name,
            color: val.color,
            logo: val.logo
          });
        },
        error: (err: any) => {
          this._alert.showToast('Error en el servidor, si el problema persiste contacte con el administrador', 'error');
        }
      });
    }
  }

  onSubmit() {
    if (this.brandForm.valid) {
      if (this.data) {
        // se le tiene que pasar el id y el formvalue
        this._brand.update({ _id: this.data.id, ...this.brandForm.value }).subscribe({
          next: (val: any) => {
            this._alert.showAlert('Marca actualizada', 'success', 'success');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
            this._alert.showToast('Error en el servidor, si el problema persiste contacte con el administrador', 'error');
          }
        });
      } else {
        this._brand.create(this.brandForm.value).subscribe({
          next: (val: any) => {
            this._alert.showAlert('Marca creada', 'success', 'success');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
            this._alert.showToast('Error en el servidor, si el problema persiste contacte con el administrador', 'error');
          }
        });
      }
    } else {
      this._alert.showToast('Por favor, rellene todos los campos', 'info');
    }
  }

}
