import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Injectable()
export class RouterService {

  constructor(private router:Router,private location: Location) { }

  routeToDashboardAdmin() {
    this.router.navigate(['dashboard/admin']);
  }
  routeToDashboardCustomer() {
    this.router.navigate(['dashboard/customer']);
  }
  routeToDashboardMarkTeam() {
    this.router.navigate(['dashboard/marketing-team']);
  }

  routeToLogin() {
    this.router.navigate(['login'])
  }

  routeToRegister() {
    this.router.navigate(['register'])
  }

  routeBack() {
    this.location.back();
  }

  routeToAllPrograms(){
    this.router.navigate(['dashboard/customer/all'])

  }
  routeToEnrolledPrograms(){
    this.router.navigate(['dashboard/customer/enrolled'])
  }
}
