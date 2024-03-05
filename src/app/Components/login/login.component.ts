import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreadcrumbsService } from '../../breadcrumbs.service';
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
import { AlertService } from '../../alert.service';

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
  loginForm: FormGroup;

  constructor(
    private breadcrumbsService: BreadcrumbsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alert: AlertService,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Establece las migas de pan para este componente
    this.breadcrumbsService.setBreadcrumbs([
      { label: 'Home', url: '/home' },
      { label: 'Login', url: '/login' },
    ]);
  }

  onSubmit() {
    console.log(this.loginForm.value.username, this.loginForm.value.password);
    this.authService
      .login({
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      })
      .subscribe(() => {
        this.router.navigate(['/admin']);
      });
  }

  register() {
    this.router.navigate(['/register']);
  }
}
