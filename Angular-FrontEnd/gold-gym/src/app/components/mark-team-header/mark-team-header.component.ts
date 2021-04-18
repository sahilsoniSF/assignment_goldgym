import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { LoginService } from 'src/app/services/login.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-mark-team-header',
  templateUrl: './mark-team-header.component.html',
  styleUrls: ['./mark-team-header.component.css']
})
export class MarkTeamHeaderComponent implements OnInit {

  constructor(
    private loginService:LoginService,
    private routeService:RouterService,
  ) { }

  ngOnInit(): void {
  }

  signout(){
    this.loginService.removeToken();
    localStorage.removeItem('username')
    this.routeService.routeToLogin();
  }
}
