import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { ProgramsService } from 'src/app/services/programs.service';

@Component({
  selector: 'app-all-programs',
  templateUrl: './all-programs.component.html',
  styleUrls: ['./all-programs.component.css']
})
export class AllProgramsComponent implements OnInit {

  programs:Card[];
  constructor(private programsService:ProgramsService) { }

  ngOnInit(): void {
    this.programsService.getPrograms()
    .subscribe(data=>{
      this.programs=data;
    })
  }

}
