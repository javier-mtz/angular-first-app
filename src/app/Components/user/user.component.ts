import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/authService/auth.service';
import { UserDialogComponent } from '../../Dialogs/user-dialog/user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from '../../Dialogs/auth-dialog/auth-dialog.component';

import { Router } from '@angular/router';


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
    MatInputModule,
    MatSelectModule,
    FlexLayoutModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  user: any = {};

  constructor(private _auth: AuthService, private _dialog: MatDialog, private router: Router) {
    this._auth.getCurrentAuthUser().subscribe(user => {
      if (user === null) {
        this.router.navigate(['/login']);
        return;
      }
      this.user = user;
      if (user.oneTimePassword !== undefined && user.oneTimePassword) {
        this.changeMailPassword();
      }
    });
  }

  updateUser() {
    const dialogRef = this._dialog.open(UserDialogComponent, {
      data: {
        id: this.user._id,
        editable: false
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this._auth.getCurrentAuthUser().subscribe(user => {
            if (user === null) {
              this.router.navigate(['/login']);
              return;
            }
            this.user = user;
          });
        }
      }
    });
  }

  changePassword() {
    const dialogRef = this._dialog.open(AuthDialogComponent, {
      data: {
        id: this.user._id
      },
      disableClose: true
    });
  }

  changeMailPassword() {
    const dialogRef = this._dialog.open(AuthDialogComponent, {
      data: {
        id: this.user._id,
        newPassword: true
      },
      disableClose: true
    });
  }

  ngOnInit(): void {
    
  }
  

}
