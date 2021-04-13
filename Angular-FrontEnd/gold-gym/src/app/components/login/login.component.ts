import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  uname:string;
  password:string;
  radio:string;
  constructor(private routerService:RouterService) { }

  ngOnInit(): void {
  }

  submit(){

    if(!this.uname || !this.password || !this.radio)
    {
      console.log("Enter all the details");
    }

    if(this.radio=='1')
    {
      this.routerService.routeToDashboardCustomer();
    }
    else if(this.radio=='2')
    {
      this.routerService.routeToDashboardAdmin();
    }
    else if(this.radio=='3')
    {
      this.routerService.routeToDashboardMarkTeam();
    }

  }
}
