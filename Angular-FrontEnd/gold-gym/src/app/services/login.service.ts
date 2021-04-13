import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  authenticateCustomer(data) {
    return this.http.post('http://localhost:3001/customer/login', data);
  }
  setBearerToken(token) {
    localStorage.setItem('token', token);
  }

  getBearerToken() {
    return localStorage.getItem('token');
  }
  isUserAuthenticated()
  {
    return this.http.post('http://localhost:3001/customer/verify',{},{
      headers:new HttpHeaders().set('Authorization',`${this.getBearerToken()}`)
    });
  }
}
