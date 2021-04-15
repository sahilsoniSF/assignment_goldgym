import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.css']
})
export class CustomerHeaderComponent implements OnInit {

  constructor(
    private routerService:RouterService,
    private loginService:LoginService
  ) { }

  ngOnInit(): void {
  }

  changeToAll(){
    this.routerService.routeToAllPrograms();
  }
  
  changeToEnrolled(){
    this.routerService.routeToEnrolledPrograms();
  }

  signout(){
    this.loginService.removeToken();
    localStorage.removeItem('username');
    this.routerService.routeToLogin();
  }

}
