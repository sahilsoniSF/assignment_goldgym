import { Component, OnInit } from '@angular/core';
import { EnrolledService } from 'src/app/services/enrolled.service';
import { ProgramsService } from 'src/app/services/programs.service';
import { Card } from '../../models/card.model';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {

  programs:Array<Card>;
  constructor(
    private programsService:ProgramsService,
    private enrolledService:EnrolledService
    ) { 
    this.programsService.fetchProgramsFromServer();
    this.enrolledService.fetchEnrolledProgramsFromServer();
  }

  ngOnInit(): void {
    
  }

}
