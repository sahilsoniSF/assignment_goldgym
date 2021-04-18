import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  userId:number=-1;
  constructor(private http: HttpClient) {}

  setBearerToken(token) {
    localStorage.setItem('token', token);
  }

  getBearerToken() {
    return localStorage.getItem('token');
  }
  removeToken()
  {
    localStorage.removeItem('token');
  }

  // Customer Services !!
  authenticateCustomer(data) {
    localStorage.setItem('username',data.name);
    return this.http.post<any>('http://localhost:3001/customer/login', data);
  }
  
  isUserAuthenticated()
  {
    return this.http.post('http://localhost:3001/customer/verify',{},{
      headers:new HttpHeaders().set('Authorization',`${this.getBearerToken()}`)
    });
  }

  // Admin Service !!
  authenticateAdmin(data) {
    localStorage.setItem('username',data.name);
    return this.http.post('http://localhost:3001/admin/login', data);
  }
  
  isAdminAuthenticated()
  {
    return this.http.post('http://localhost:3001/admin/verify',{},{
      headers:new HttpHeaders().set('Authorization',`${this.getBearerToken()}`)
    });
  }


  // Marketing Team Service !!
  authenticateMarkTeam(data) {
    localStorage.setItem('username',data.name);
    return this.http.post('http://localhost:3001/mark-team/login', data);
  }
  
  isMarkTeamAuthenticated()
  {
    return this.http.post('http://localhost:3001/mark-team/verify',{},{
      headers:new HttpHeaders().set('Authorization',`${this.getBearerToken()}`)
    });
  }



}
