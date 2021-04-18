import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { ProgramsService } from 'src/app/services/programs.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  listOfPrograms:Card[]=[];
  open:boolean=false;
  // new program details
  title:string;
  price:number;
  desc:string;
  duration:string;

  constructor(
    private programService:ProgramsService
  ) {
    this.programService.fetchProgramsFromServer();
   }

  ngOnInit(): void {
    this.programService.getPrograms()
    .subscribe(data=>{
      this.listOfPrograms=data;
    })
  }
  openIt(){
    // toggle
    this.open=this.open?false:true;
  }
  addNewProgram(){
    const data={
      title:this.title,
      price:this.price,
      desc:this.desc,
      duration:this.duration
    }
    this.programService.addNewProgram(data);
    this.openIt();
  }
  

}
