import { Component, OnInit, ViewChild } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { UserDialogComponent } from '../../Dialogs/user-dialog/user-dialog.component';
import { UserService } from '../../Services/userService/user.service';

import { AlertService } from '../../Services/alertService/alert.service';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-brand-list',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    UserDialogComponent,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './brand-list.component.html',
  styleUrl: './brand-list.component.css'
})
export class BrandListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'username', 'email', 'role', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public _dialog: MatDialog, private _user: UserService, private _alert: AlertService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  openDialog() {
    const dialogRef = this._dialog.open(UserDialogComponent, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.getBrands();
        }
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getBrands() {
    this._user.getAll().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        console.log(err);
        this._alert.showAlert('Error', 'Error interno, si el problema persiste contacte con el administrador', 'error');
      }
    });
  }

  deleteUser(id: String) {
    this._alert.showConfirmAlert('Eliminar usuario', '¿Estas seguro de eliminar este usuario?', 'warning', 'Eliminar', 'Cancelar', () => {
      this._user.delete(id).subscribe({
        next: (res) => {
          this.getBrands();
          this._alert.showAlert('Usuario eliminado', 'Usuario eliminado correctamente', 'success');
        },
        error: (err: any) => {
          console.log(err);
          this._alert.showToast('Error en el servidor, si el problema persiste contacte con el administrador', 'error');
        }
      });
    });

  }

  updateUser(id: String) {
    const dialogRef = this._dialog.open(UserDialogComponent, {
      data: {
        id
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.getBrands();
        }
      }
    });
  }

}
