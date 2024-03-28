import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../Services/authService/auth.service';
import { Router } from '@angular/router';
import { CommonService } from '../../common.service';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreadcrumbsService } from '../../Services/breadcrumbService/breadcrumbs.service';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from '../header/header.component';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import {
  Form,
  FormGroup,
  NgForm,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '../../Services/alertService/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordDialogComponent } from '../../Dialogs/forgot-password/forgot-password-dialog.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbsComponent,
    HeaderComponent,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = '';
  password = '';
  ip = {};
  loginForm: FormGroup;

  constructor(
    private breadcrumbsService: BreadcrumbsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alert: AlertService,
    private authService: AuthService,
    private commonService: CommonService,
    private _dialog: MatDialog
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.commonService.getIPAddress().subscribe((res: any) => {
      this.ip = res;
    });
  }

  ngOnInit() {
    // hacer log out
    // this.authService.logout();

    // Establece las migas de pan para este componente
    this.breadcrumbsService.setBreadcrumbs([
      { label: 'Home', url: '/home' },
      { label: 'Login', url: '/login' },
    ]);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .login({
          username: this.loginForm.value.username,
          password: this.loginForm.value.password,
          ip: this.ip,
        })
        .subscribe({
          next: (val: any) => {
            this.alert.showToast('Bienvenido 😄', 'success');
            this.authService.isAdmin().subscribe(isAdmin => {
              if (isAdmin) {
                this.router.navigate(['/admin']);
              } else {
                this.router.navigate(['/home']);
              }
            });
          },
          error: (err: any) => {
            this.alert.showToast('Usuario y/o contraseña incorrectos', 'error');
          }
        });
    } else {
      this.alert.showToast('Por favor, rellene todos los campos', 'info');
    }
  }

  forgotPassword() {
    const dialogRef = this._dialog.open(ForgotPasswordDialogComponent, {
      width: '30%',
    });
  }

  register() {
    this.router.navigate(['/register']);
  }
}
