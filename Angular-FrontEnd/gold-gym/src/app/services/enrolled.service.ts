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
    
    list:any[] =[];

    EnrolledProgram:Array<Card>=[];
    EnrolledProgramSubject:BehaviorSubject<Array<Card>>;

    constructor(
        private http:HttpClient,
        private programService:ProgramsService
    )
    {
        this.EnrolledProgramSubject=new BehaviorSubject([]);
    }


    fetchEnrolledProgramsFromServer(){
        this.list=[];
        this.EnrolledProgram=[];
        const username=localStorage.getItem('username');
        const data={"username":username};
        return this.http.post<[]>('http://localhost:3002/enrolledProgramsByUsername',data)
        .subscribe(programs=>{
            this.list=programs;
            if(this.list.length==0)
            {
                this.EnrolledProgramSubject.next([]);
            }
            this.LogicFunction();
        })
    }

    getEPrograms():BehaviorSubject<Array<any>>
    {
        return this.EnrolledProgramSubject;
    }

    fetchProgramById(id:number,check:boolean){
        this.http.get<Card>(`http://localhost:3002/programs/${id}`)
        .subscribe(program=>{
            this.EnrolledProgram.push(program);
            if(check)
            this.EnrolledProgramSubject.next(this.EnrolledProgram);
        })
    }

    LogicFunction(){
        this.EnrolledProgram=[];
        for(let i=0;i<this.list.length;i++)
        {
            this.fetchProgramById(this.list[i].programId,i===this.list.length-1);
        }
    }

    // Card Enroll-Diseroll

    enrollProgram(programId:number,username:string){
        const data={
            programId:programId,
            username:username
        }
        this.http.post('http://localhost:3002/enrolled-programs',data)
        .subscribe(data=>{
            this.fetchEnrolledProgramsFromServer();
        })
    }
    disenrollProgram(data:{"programId":number,"username":string}){
        // console.log(data);
        this.http.post('http://localhost:3002/enrolledProgram/delete',data)
        .subscribe(data=>{
            this.fetchEnrolledProgramsFromServer();
        })
    }


}