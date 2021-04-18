import { Component, Input, OnInit } from '@angular/core';
import { EnquiriesService } from 'src/app/services/enquiries.service';

@Component({
  selector: 'app-mark-team-cards',
  templateUrl: './mark-team-cards.component.html',
  styleUrls: ['./mark-team-cards.component.css']
})
export class MarkTeamCardsComponent implements OnInit {

  @Input()
  card;
  constructor(
    private enquiriesService:EnquiriesService,
  ) { }

  ngOnInit(): void {
  }

  resolved(){
    this.enquiriesService.enquiryResolved(this.card.id);
  }

}
