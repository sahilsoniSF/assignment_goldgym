import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
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
  errorMessage:string=''
  constructor(
    private routerService:RouterService,
    private loginService:LoginService
    ) { }

  ngOnInit(): void {
  }

  submit(){

    const user={
      name:this.uname,
      password:this.password
    }
    if(!this.uname || !this.password || !this.radio)
    {
      this.errorMessage="Enter all details"
      return;
    }
    this.errorMessage="";

    if(this.radio=='1')
    {
      this.loginService.authenticateCustomer(user)
      .subscribe(data=>{
        this.loginService.setBearerToken(data["token"]);
        this.routerService.routeToDashboardCustomer();
      },
      err=>{
        // console.log("Error : ",err);
        this.errorMessage=err.error.text;
        // console.log(this.errorMessage);
        
      })


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
