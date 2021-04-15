import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { EnrolledService } from 'src/app/services/enrolled.service';
import { ProgramsService } from 'src/app/services/programs.service';

@Component({
  selector: 'app-customer-enrolled-programs',
  templateUrl: './customer-enrolled-programs.component.html',
  styleUrls: ['./customer-enrolled-programs.component.css'],
})
export class CustomerEnrolledProgramsComponent implements OnInit {

  ArrayofPrograms = [];
  constructor(
    private enrolledService: EnrolledService,
  ) {  }

  ngOnInit(): void {
    this.enrolledService.getEPrograms()
    .subscribe(data=>{
      console.log("Getting the Enrolled programs",data);
      this.ArrayofPrograms=data;
    },
    err=>{
      console.log("Error in getting Enrolled Programs");
    })
  }

}
