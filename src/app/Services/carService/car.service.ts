import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car, CarResponse, DeleteResponse } from '../../Interfaces/car';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  create(car: Car): Observable<CarResponse> {
    return this.http.post<CarResponse>('http://localhost:3000/api/car/create', car);
  }

  getAll(): Observable<CarResponse[]> {
    return this.http.get<CarResponse[]>('http://localhost:3000/api/car/all');
  }

  delete(id: String): Observable<DeleteResponse> {
    return this.http.delete<DeleteResponse>(`http://localhost:3000/api/car/delete/${id}`);
  }

  update(car: Car): Observable<CarResponse> {
    return this.http.put<CarResponse>(`http://localhost:3000/api/car/update/${car._id}`, car);
  }

  find(id: String): Observable<CarResponse> {
    return this.http.get<CarResponse>(`http://localhost:3000/api/car/find/${id}`);
  }
  
  findCarbyUser(id: String): Observable<CarResponse[]> {
    return this.http.get<CarResponse[]>(`http://localhost:3000/api/car/findbyuser/${id}`);
  }

  returnCar(id: String): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/car/returnCar/${id}`);
  }
}
