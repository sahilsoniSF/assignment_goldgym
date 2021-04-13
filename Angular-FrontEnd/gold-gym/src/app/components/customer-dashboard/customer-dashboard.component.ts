import { Component, OnInit } from '@angular/core';
import { ProgramsService } from 'src/app/services/programs.service';
import { Card } from '../../models/card.model';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {

  programs:Array<Card>;
  constructor(private programsService:ProgramsService) { 
    this.programsService.fetchProgramsFromServer();
  }

  ngOnInit(): void {
    this.programsService.getPrograms()
    .subscribe(data=>{
      this.programs=data;
    })
  }

}
