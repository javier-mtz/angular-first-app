import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserIRegister } from '../../Interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  create(user: UserIRegister): Observable<any> {
    return this.http.post('http://localhost:3000/user/signup', user);
  }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:3000/user/all');
  }

  delete(id: String): Observable<any> {
    return this.http.put(`http://localhost:3000/user/delete/${id}`, {});
  }

  update(user: User): Observable<any> {
    return this.http.put(`http://localhost:3000/user/update/${user._id}`, user);
  }

  find(id: String): Observable<any> {
    return this.http.get(`http://localhost:3000/user/find/${id}`);
  }
}
