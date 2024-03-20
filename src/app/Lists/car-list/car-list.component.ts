import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

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

import { CarDialogComponent } from '../../Dialogs/car-dialog/car-dialog.component';
import { CarService } from '../../Services/carService/car.service';
import { AlertService } from '../../Services/alertService/alert.service';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    CarDialogComponent,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent implements OnInit {

  displayedColumns: string[] = ['model', 'description', 'price', 'engine', 'brand', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public _dialog: MatDialog, private _car: CarService, private _alert: AlertService) { }

  ngOnInit(): void {
    this.getCars();
  }

  openDialog() {
    const dialogRef = this._dialog.open(CarDialogComponent, {
      width: '800px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.getCars();
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

  getCars() {
    this._car.getAll().subscribe({
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

  deleteCar(id: String) {
    this._alert.showConfirmAlert('Eliminar carro', '¿Estas seguro de eliminar este carro?', 'warning', 'Eliminar', 'Cancelar', () => {
      this._car.delete(id).subscribe({
        next: (res) => {
          this.getCars();
          this._alert.showAlert('Carro eliminado', 'Carro eliminado correctamente', 'success');
        },
        error: (err: any) => {
          console.log(err);
          this._alert.showToast('Error en el servidor, si el problema persiste contacte con el administrador', 'error');
        }
      });
    });

  }

  updateCar(id: String) {
    const dialogRef = this._dialog.open(CarDialogComponent, {
      width: '800px',
      data: {
        id
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.getCars();
        }
      }
    });
  }

  // openDialogInfo(id: String) {
  //   const dialogRef = this._dialog.open(CarDialogInfoComponent, {
  //     width: '800px',
  //     data: {
  //       id
  //     },
  //     disableClose: true
  //   });
  //   dialogRef.afterClosed().subscribe({
  //     next: (res) => {
  //       if (res) {
  //         this.getCars();
  //       }
  //     }
  //   });
  // }

}
