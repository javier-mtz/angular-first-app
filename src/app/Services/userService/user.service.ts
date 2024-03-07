import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dialog, User } from '../../Interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  create(user: Dialog): Observable<any> {
    return this.http.post('http://localhost:3000/user/create', user);
  }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:3000/user/all');
  }

  delete(id: Number): Observable<any> {
    return this.http.delete(`http://localhost:3000/user/delete/${id}`);
  }

  update(user: User): Observable<any> {
    return this.http.put(`http://localhost:3000/user/update/${user._id}`, user);
  }

  find(id: Number): Observable<any> {
    return this.http.get(`http://localhost:3000/user/find/${id}`);
  }
}
