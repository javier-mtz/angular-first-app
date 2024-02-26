import { Component, OnInit } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { ActivatedRoute, RouterModule } from '@angular/router'; // Asegúrate de importar RouterModule
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { data } from '../../../assets/data/info';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';

import { MatInputModule } from '@angular/material/input';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreadcrumbsService } from '../../breadcrumbs.service';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from "../header/header.component";
import { Form, FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
    selector: 'app-brands',
    standalone: true,
    templateUrl: './formulario.component.html',
    styleUrl: './formulario.component.css',
    providers: [BreadcrumbsService],
    imports: [MatFormFieldModule, MatInputModule, MatGridListModule, RouterModule, CommonModule, MatCardModule, BreadcrumbsComponent, MatToolbarModule, MatCheckboxModule, HeaderComponent, FormsModule, ReactiveFormsModule]
})

export class FormularioComponent implements OnInit{
  [x: string]: any;
  brand: string = ''; // Inicializando la propiedad brand
  registro: FormGroup; // Inicializando la propiedad myForm
  data = data;

  constructor(private breadcrumbsService: BreadcrumbsService, private formBuilder: FormBuilder, private router: Router) {
    this.registro = this.formBuilder.group({
      nombre: ['', Validators.required],
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
      { label: 'Formulario', url: '/formulario' }
    ]);
  }

  onSubmit() {
    if(this.registro.valid) {
      console.log('Form Submitted!', this.registro.value);
      this.registro.reset();
    } else {
      alert('Formulario no válido, por favor revise los campos');
    }
  }
  login(){
    this.router.navigate(['/home']);
  }
}
