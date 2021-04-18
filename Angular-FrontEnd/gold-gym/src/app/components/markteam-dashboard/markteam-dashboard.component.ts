import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { EnquiriesService } from 'src/app/services/enquiries.service';

@Component({
  selector: 'app-markteam-dashboard',
  templateUrl: './markteam-dashboard.component.html',
  styleUrls: ['./markteam-dashboard.component.css']
})
export class MarkteamDashboardComponent implements OnInit {

  listOfEnquiries:[]=[];
  constructor(
    private enquiriesService:EnquiriesService,
  ) 
  { 
    this.getCards();
    this.enquiriesService.anyChanges()
    .subscribe(data=>{
      this.getCards();
    });
  }

  ngOnInit(): void {
  }
  getCards(){
    this.enquiriesService.fetchAllEnquiries()
    .subscribe(data=>{
      this.listOfEnquiries=data;
      // console.log(this.listOfEnquiries);
    });
  }

}
