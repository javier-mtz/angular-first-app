import { Component, ViewChild } from '@angular/core';
import { CarService } from '../../Services/carService/car.service';
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
import { AlertService } from '../../Services/alertService/alert.service';

@Component({
  selector: 'app-rented-list',
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
  templateUrl: './rented-list.component.html',
  styleUrl: './rented-list.component.css'
})
export class RentedListComponent {

  displayedColumns: string[] = ['brand', 'model', 'price', 'user'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _car: CarService) { }

  ngOnInit(): void {
    this.getRentedCars();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRentedCars() {
    this._car.getRentedCars().subscribe((cars) => {
      this.dataSource = new MatTableDataSource(cars);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

}
