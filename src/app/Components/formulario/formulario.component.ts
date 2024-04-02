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
import { AuthService } from '../../Services/authService/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConditionsDialogComponent } from '../../Dialogs/conditions/conditions-dialog.component';


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

  constructor(private breadcrumbsService: BreadcrumbsService, private formBuilder: FormBuilder, private router: Router, private alert: AlertService, private userServicie: UserService, private authService: AuthService, private _dialog: MatDialog) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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

    // validar que el checkbox de términos y condiciones esté marcado
    if (!this.registerForm.value.terms) {
      this.alert.showToast('Debe aceptar los términos y condiciones', 'info');
      return;
    }

    if (this.registerForm.valid) {
      // Si el formulario es válido, validar que las contraseñas coincidan
      if (this.registerForm.value.password !== this.registerForm.value.password2) {
        // Si las contraseñas no coinciden, mostrar una alerta
        this.alert.showToast('Las contraseñas no coinciden', 'info');
        // reseteat los campos de contraseña
        this.registerForm.controls['password'].reset();
        this.registerForm.controls['password2'].reset();
      } else {
        this.userServicie.signup({
          username: this.registerForm.value.username,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password,
        }).subscribe({
          next: (val: any) => {
            this.alert.showToast('Usuario creado exitosamente', 'success');
            if (this.authService.isAdmin()) {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/home']);
            }
          },
          error: (err: any) => {
            console.error(err);
            this.alert.showToast("Nombre no es seguro para el usuario", 'error');
          }
        });
      }
    }
  }

  login() {
    this.router.navigate(['/login']);
  }

  conditions() {
    const dialogRef = this._dialog.open(ConditionsDialogComponent, {
      disableClose: true,
      width: '40%',
      height: '60%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.registerForm.controls['terms'].setValue(true);
    });
  }
}
