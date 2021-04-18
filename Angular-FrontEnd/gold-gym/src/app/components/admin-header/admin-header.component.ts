import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  constructor(
    private loginService:LoginService,
    private routeService:RouterService
  ) { }

  ngOnInit(): void {
  }

  signOut(){
    this.loginService.removeToken();
    localStorage.removeItem('username')
    this.routeService.routeToLogin();
  }
}
