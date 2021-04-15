import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/observable/from';
import { Card } from '../models/card.model';
import { LoginService } from './login.service';
import { ProgramsService } from './programs.service';

@Injectable()
export class EnrolledService{
    
    list ;
    programsSubject : BehaviorSubject<Array<any>>;

    EnrolledProgram:Array<Card>;
    EnrolledProgramSubject:BehaviorSubject<Array<Card>>;

    constructor(
        private http:HttpClient,
        private programService:ProgramsService
    )
    {
        this.programsSubject=new BehaviorSubject([]);
        this.EnrolledProgramSubject=new BehaviorSubject([]);
    }


    fetchEnrolledProgramsFromServer(){
        const username=localStorage.getItem('username');
        const data={"username":username};
        return this.http.post('http://localhost:3002/enrolledProgramsByUsername',data)
        .subscribe(programs=>{
            // console.log(111,programs);
            // this.list=programs;
            // this.programsSubject.next(this.list);
        })
    }

    getEPrograms():BehaviorSubject<Array<any>>
    {
        return this.programsSubject;
    }

}