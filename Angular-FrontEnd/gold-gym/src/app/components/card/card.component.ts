import { Component, Input, OnInit } from '@angular/core';
import { EnquiriesService } from 'src/app/services/enquiries.service';
import { EnrolledService } from 'src/app/services/enrolled.service';
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
    private loginService:LoginService,
    private enrollService:EnrolledService,
    private enquiriesService:EnquiriesService
  ) { }

  ngOnInit(): void {
  }
  submitQuery(){
    if(this.query.length>1)
    this.enquiriesService.submitQuery(this.query,this.card.id,this.loginService.userId);
  }
  enroll(){
    // toggling button
    (<HTMLInputElement> document.getElementById(`btn-2${this.card.id}`)).disabled=false;
    (<HTMLInputElement> document.getElementById(`btn-1${this.card.id}`)).disabled=true;
    

    // backend access
    this.enrollService.enrollProgram(this.card.id,localStorage.getItem("username"));
  }

  disenroll(){
    (<HTMLInputElement> document.getElementById(`btn-1${this.card.id}`)).disabled=false;
    (<HTMLInputElement> document.getElementById(`btn-2${this.card.id}`)).disabled=true;
    this.enrollService.disenrollProgram({programId:this.card.id,username:localStorage.getItem("username")});
  }
}
