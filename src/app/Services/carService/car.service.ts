import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../../Interfaces/car';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  create(car: Car): Observable<any> {
    return this.http.post('http://localhost:3000/car/create', car);
  }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:3000/car/all');
  }

  delete(id: String): Observable<any> {
    return this.http.delete(`http://localhost:3000/car/delete/${id}`);
  }

  update(car: Car): Observable<any> {
    return this.http.put(`http://localhost:3000/car/update/${car._id}`, car);
  }

  find(id: String): Observable<any> {
    return this.http.get(`http://localhost:3000/car/find/${id}`);
  }
  
  findCarbyUser(id: String): Observable<any> {
    console.log(id, 'id');
    return this.http.get(`http://localhost:3000/car/findbyuser/${id}`);
  }
}
