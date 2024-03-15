import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Brand } from '../../Interfaces/brand';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  create(brand: Brand): Observable<any> {
    return this.http.post('http://localhost:3000/brand/create', brand);
  }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:3000/brand/all');
  }

  delete(id: String): Observable<any> {
    return this.http.put(`http://localhost:3000/brand/delete/${id}`, {});
  }

  update(brand: Brand): Observable<any> {
    return this.http.put(`http://localhost:3000/brand/update/${brand._id}`, brand);
  }

  find(id: String): Observable<any> {
    return this.http.get(`http://localhost:3000/brand/find/${id}`);
  }
}
