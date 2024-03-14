import { Component, OnInit, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ActivatedRoute, RouterModule } from '@angular/router'; // Asegúrate de importar RouterModule
import { CommonModule } from '@angular/common';
import { UserService } from '../../Services/userService/user.service'
import { MatCardModule } from '@angular/material/card';
import { data } from '../../../assets/data/info';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreadcrumbsService } from '../../Services/breadcrumbService/breadcrumbs.service';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from "../header/header.component";
import { Form, FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '../../Services/alertService/alert.service';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-brands',
  standalone: true,
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
  providers: [BreadcrumbsService],
  imports: [MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    RouterModule,
    CommonModule,
    MatCardModule,
    BreadcrumbsComponent,
    MatToolbarModule,
    MatCheckboxModule,
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule
  ]
})

export class FormularioComponent implements OnInit {
  [x: string]: any;
  brand: string = ''; // Inicializando la propiedad brand
  registerForm: FormGroup; // Inicializando la propiedad myForm
  data = data;

  constructor(private breadcrumbsService: BreadcrumbsService, private formBuilder: FormBuilder, private router: Router, private alert: AlertService, private userServicie: UserService) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      terms: [false, Validators.required]
    });
  }

  ngOnInit() {
    // Establece las migas de pan para este componente
    this.breadcrumbsService.setBreadcrumbs([
      { label: 'Home', url: '/home' },
      { label: 'Register', url: '/register' }
    ]);
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      // Si el formulario es válido, validar que las contraseñas coincidan
      if (this.registerForm.value.password !== this.registerForm.value.password2) {
        // Si las contraseñas no coinciden, mostrar una alerta
        this.alert.showToast('Las contraseñas no coinciden', 'info');
        // reseteat los campos de contraseña
        this.registerForm.controls['password'].reset();
        this.registerForm.controls['password2'].reset();
      } else {
        this.userServicie.create({
          username: this.registerForm.value.username,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password,
        }).subscribe({
          next: (val: any) => {
            this.alert.showToast('Usuario creado exitosamente', 'success');
            this.router.navigate(['/admin']);
          },
          error: (err: any) => {
            console.log(JSON.stringify(err));
            this.alert.showToast("Este usuario ya existe", 'error');
          }
        });
        // Si las contraseñas coinciden, hacer un POST request al servidor
        // con los datos del formulario
        this.alert.showLoading();
        this.alert.closeLoading();
      }
    }
  }

  login() {
    this.router.navigate(['/login']);
  }
}
