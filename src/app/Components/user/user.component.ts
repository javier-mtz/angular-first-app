import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    HeaderComponent,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    CommonModule,
    MatInputModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  constructor() { }

  ngOnInit(): void {
  }
  

}
