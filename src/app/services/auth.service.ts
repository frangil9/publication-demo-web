import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  isLoggedin() {
    return localStorage.getItem('auth-token') ? true : false;
  }

  doLogin(credentials): Observable<any> {
    let body = JSON.stringify(credentials);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<any>(environment.apiUrl + '/users/authenticate', body, { headers: headers }).pipe(
      tap((data: any) => {
        localStorage.setItem('auth-token', data.token);
      })
    );
  }

  getToken() {
    return localStorage.getItem('auth-token');
  }

  decodeToken(token) {
    try {
      return jwt_decode(token);
    }
    catch (err) {
      return null;
    }
  }

  getUserLogged() {
    const token = this.getToken();
    const userLogged = this.decodeToken(token);
    return {
      id: userLogged.sub,
      name: userLogged.name
    };
  }

  doLogout() {
    localStorage.removeItem('auth-token');
    this.router.navigate(['']);
  }
}
