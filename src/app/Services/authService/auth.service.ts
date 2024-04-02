import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { AuthResponse, Login, User, UserIRegister, mailLogin } from '../../Interfaces/user';
import { jwtDecode } from 'jwt-decode';


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

  login(user: Login): Observable<AuthResponse> {
    return this.http
      .post('http://localhost:3000/api/auth/login', user)
      .pipe(tap((response: any) => this.doLoginUser(user.username, response.token)));
  }

  mailLogin(user: mailLogin) {
    this.doLoginUser(user.username, user.token);
  }

  private doLoginUser(username: string, token: string) {
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
    return this.http.get<User>('http://localhost:3000/api/auth/currentUser');
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

  isTokenExpired() {
    try {
      const token = localStorage.getItem(this.JWT_TOKEN);
      if(!token) return true;
      const decoded = jwtDecode(token);
      if(!decoded.exp) return true;
      const expirationDate = decoded.exp * 1000;
      const now = new Date().getTime();
      const isExpired = expirationDate < now;
  
      if (isExpired) {
        localStorage.removeItem(this.JWT_TOKEN); 
      }
      return isExpired;
    } catch (error) {
      localStorage.removeItem(this.JWT_TOKEN); 
      return true;
    }
  }  
}
