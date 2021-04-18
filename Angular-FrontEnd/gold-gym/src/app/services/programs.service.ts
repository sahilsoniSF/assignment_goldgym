import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Card } from '../models/card.model';

@Injectable()
export class ProgramsService{

    // All Programs
    programs : Array<Card>;
    programsSubject : BehaviorSubject<Array<Card>>;


    constructor(
        private http:HttpClient
    )
    {
        this.programs=[];
        this.programsSubject=new BehaviorSubject([]);
    }

    // For All Programs Compoent
    fetchProgramsFromServer(){
        return this.http.get<Card[]>('http://localhost:3002/programs')
        .subscribe(programs=>{
            this.programs=programs;
            this.programsSubject.next(this.programs);
        })
    }

    getPrograms():BehaviorSubject<Array<Card>>
    {
        return this.programsSubject;
    }

    // Add new program
    addNewProgram(data){
        this.http.post('http://localhost:3002/programs',data)
        .subscribe(data=>{
            this.fetchProgramsFromServer();
        })
    }
    
}