import { Component, Inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AlertService } from '../../Services/alertService/alert.service';
import { UserService } from '../../Services/userService/user.service';

@Component({
  selector: 'app-user-dialog',
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
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.css'
})
export class UserDialogComponent implements OnInit {
  userForm: FormGroup;
  roles: string[] = [
    'Admin',
    'User'
  ];
  constructor(private fb: FormBuilder, private _alert: AlertService, private _user: UserService, private _dialogRef: MatDialogRef<UserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userForm = this.fb.group({
      username: [''],
      email: [''],
      role: ['']
    });
    // los campos del formulario son requeridos
    this.userForm.controls['username'].setValidators([Validators.required]);
    this.userForm.controls['email'].setValidators([Validators.required]);
    this.userForm.controls['role'].setValidators([Validators.required]);
  }

  ngOnInit() {
    if (this.data) {
      this._user.find(this.data.id).subscribe({
        next: (val: any) => {
          this.userForm.setValue({
            username: val.username,
            email: val.email,
            role: val.role
          });
        },
        error: (err: any) => {
          this._alert.showToast('Error en el servidor, si el problema persiste contacte con el administrador', 'error');
        }
      });
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.data) {
        // se le tiene que pasar el id y el formvalue
        this._user.update({ _id: this.data.id, ...this.userForm.value }).subscribe({
          next: (val: any) => {
            this._alert.showAlert('Usuario actualizado', 'success', 'success');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
            this._alert.showToast('Error en el servidor, si el problema persiste contacte con el administrador', 'error');
          }
        });
      } else {
        this._user.create(this.userForm.value).subscribe({
          next: (val: any) => {
            this._alert.showAlert('Usuario creado', 'success', 'success');
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
