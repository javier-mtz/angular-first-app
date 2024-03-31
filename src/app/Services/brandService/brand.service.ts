import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Brand, BrandResponse, DeleteResponse } from '../../Interfaces/brand';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  create(brand: Brand): Observable<BrandResponse> {
    return this.http.post<BrandResponse>('http://localhost:3000/api/brand/create', brand);
  }

  getAll(): Observable<BrandResponse[]> {
    return this.http.get<BrandResponse[]>('http://localhost:3000/api/brand/all');
  }

  delete(id: String): Observable<DeleteResponse> {
    return this.http.put<DeleteResponse>(`http://localhost:3000/api/brand/delete/${id}`, {});
  }

  update(brand: Brand): Observable<BrandResponse> {
    return this.http.put<BrandResponse>(`http://localhost:3000/api/brand/update/${brand._id}`, brand);
  }

  find(id: String): Observable<BrandResponse> {
    return this.http.get<BrandResponse>(`http://localhost:3000/api/brand/find/${id}`);
  }
}
