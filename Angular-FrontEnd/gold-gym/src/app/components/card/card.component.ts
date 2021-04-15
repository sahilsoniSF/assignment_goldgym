import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card;
  query:string;
  constructor(
    private loginService:LoginService
  ) { }

  ngOnInit(): void {
  }
  submitQuery(){
    console.log(this.query);
  }
  enroll(){
    const username=this.loginService.userDetails;
    // toggling button
    (<HTMLInputElement> document.getElementById(`btn-2${this.card.id}`)).disabled=false;
    (<HTMLInputElement> document.getElementById(`btn-1${this.card.id}`)).disabled=true;

    // backend access
    
  }

  disenroll(){
    (<HTMLInputElement> document.getElementById(`btn-1${this.card.id}`)).disabled=false;
    (<HTMLInputElement> document.getElementById(`btn-2${this.card.id}`)).disabled=true;

  }
}
