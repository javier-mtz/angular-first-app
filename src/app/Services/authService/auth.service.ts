import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Login, User, UserIRegister } from '../../Interfaces/user';



@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private router = inject(Router);
  private http = inject(HttpClient);

  constructor() {}

  login(user: Login): Observable<any> {
    return this.http
      .post('http://localhost:3000/auth/login', user)
      .pipe(tap((response: any) => this.doLoginUser(user.username, response.token)));
  }

  private doLoginUser(username: string, token: any) {
    this.loggedUser = username;
    this.storeJwtToken(token);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/home']);
  }

  getCurrentAuthUser(): Observable<User> {
    return this.http.get<User>('http://localhost:3000/auth/currentUser');
  }

  isAdmin(): Observable<boolean> {
    return this.getCurrentAuthUser().pipe(
      map((user) => {
        if (user.role === 'Admin') {
          return true;
        }
        return false;
      })
    );
  }

  isLoggedIn() {
    return !!localStorage.getItem(this.JWT_TOKEN);
  }
}
