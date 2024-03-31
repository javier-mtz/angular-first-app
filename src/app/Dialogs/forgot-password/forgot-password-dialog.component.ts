import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../Services/userService/user.service';
import { AlertService } from '../../Services/alertService/alert.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-forgot-password-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  templateUrl: './forgot-password-dialog.component.html',
  styleUrl: './forgot-password-dialog.component.css'
})
export class ForgotPasswordDialogComponent {
  forgotPasswordForm: FormGroup;

  observer: Observer<any> = {
    next: (response) => {
      this._alert.showToast('Email enviado', 'success');
      this._dialogRef.close();
    },
    error: (error) => {
      this._alert.showToast('Error al enviar el email', 'error');
    },
    complete: () => {
      // Opcional: Si deseas realizar alguna acción cuando la operación se complete
    }
  };

  constructor(private fb: FormBuilder, private _user: UserService, private _dialogRef: MatDialogRef<ForgotPasswordDialogComponent>, private  _alert: AlertService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    // enviar email al servicio de user
    if (this.forgotPasswordForm.valid) {
      this._user.forgotPassword(this.forgotPasswordForm.value.email)
        .subscribe(this.observer);
    } else {
      // sacar el error de Validators
      if (this.forgotPasswordForm.get('email')?.hasError('required')) {
        this._alert.showToast('El email es requerido', 'info');
      } else if (this.forgotPasswordForm.get('email')?.hasError('email')) {
        this._alert.showToast('El email no es válido', 'info');
      } else {
        this._alert.showToast('Por favor, rellena el formulario', 'info');
      }
    }
  }

}
