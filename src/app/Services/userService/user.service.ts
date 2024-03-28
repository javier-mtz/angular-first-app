import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserICreate, UserIRegister } from '../../Interfaces/user';
import { AuthService } from '../authService/auth.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  signup(user: UserIRegister): Observable<any> {
    return this.http.post('http://localhost:3000/user/signup', user)
      .pipe(
        tap((response: any) => {
          this.authService.login({ username: user.username, password: user.password }).subscribe();
        })
      );
  }

  create(user: UserICreate): Observable<any> {
    return this.http.post('http://localhost:3000/user/create', user);
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

  changePassword(password: String, user: User): Observable<any> {
    return this.http.put(`http://localhost:3000/user/resetPassword/${user._id}`, password);
  }

  find(id: String): Observable<any> {
    return this.http.get(`http://localhost:3000/user/find/${id}`);
  }
}
