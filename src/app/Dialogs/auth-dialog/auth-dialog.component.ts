import { Component, Inject } from '@angular/core';
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
import { User } from '../../Interfaces/user';

@Component({
  selector: 'app-auth-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatSelectModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './auth-dialog.component.html',
  styleUrl: './auth-dialog.component.css'
})
export class AuthDialogComponent {
  passwordForm: FormGroup;
  hide = true;
  hide2 = true;
  user = {} as User;
  newPassword = false;
  title = 'Cambiar contraseña';
  buttonText = 'Actualizar';

  constructor(private fb: FormBuilder, private _alert: AlertService, private _user: UserService, private _dialogRef: MatDialogRef<AuthDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.passwordForm = this.fb.group({
      password: [''],
      confirmPassword: ['']
    });

    this.passwordForm.controls['password'].setValidators([Validators.required]);
    this.passwordForm.controls['confirmPassword'].setValidators([Validators.required]);

    if (this.data) {
      this._user.find(this.data.id).subscribe({
        next: (res) => {
          this.user = res;
        },
        error: (err) => {
          this._alert.showToast('Hubo un error al cargar el usuario', 'error');
        }
      });

      if (this.data.newPassword) {
        this.newPassword = true;
        this.title = 'Agregar contraseña';
        this.buttonText = 'Agregar';
      }
    }
  }

  onSubmit() {
    if (this.passwordForm.value.password !== this.passwordForm.value.confirmPassword) {
      this._alert.showToast('Las contraseñas no coinciden', 'error');
      // vaciar los campos
      this.passwordForm.controls['password'].setValue('');
      this.passwordForm.controls['confirmPassword'].setValue('');
      return;
    }
    // validar que el formulario sea valido
    if (this.passwordForm.valid) {
      this._user.changePassword(this.passwordForm.value, this.user).subscribe({
        next: (res) => {
          this._alert.showToast('Contraseña actualizada con éxito', 'success');
          this._dialogRef.close(true);
        },
        error: (err) => {
          this._alert.showToast('Hubo un error al guardar la contraseña', 'error');
        }
      });
    } else {
      this._alert.showToast('Por favor, rellene todos los campos', 'info');
      return;
    }
  }

}
