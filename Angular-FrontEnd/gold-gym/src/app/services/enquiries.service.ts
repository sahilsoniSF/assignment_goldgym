import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from "rxjs";

@Injectable()
export class EnquiriesService{
    
    private refreshEnquiries:boolean;
    private refreshEnquiriesSubject:BehaviorSubject<boolean>;
    
    constructor(
        private http:HttpClient,
    ){
        this.refreshEnquiries=false;
        this.refreshEnquiriesSubject=new BehaviorSubject(false);
    }

    // For Marketing Team
    fetchAllEnquiries(){
        return this.http.get<[]>('http://localhost:3003/enquiries');
    }
    anyChanges():BehaviorSubject<boolean>{
        return this.refreshEnquiriesSubject;
    }
    enquiryResolved(eId){
        return this.http.delete(`http://localhost:3003/enquiries/${eId}`)
        .subscribe(data=>{
            this.refreshEnquiriesSubject.next(this.refreshEnquiries);
        })
    }

    // For Customer Dashboard
    submitQuery(description:string,pId:number,uId:number){
        const data={
            title:"Not Set",
            desc:description,
            programId:pId,
            userId:uId,
            status:"Empty"
        };
        return this.http.post('http://localhost:3003/enquiries',data)
        .subscribe(response=>{

        })
    }

}