  import { Injectable} from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { DoctorData } from './DoctorData';



  @Injectable()

  export class DataService{
      constructor(private http:HttpClient){
      }

      private url:string="http://21888999.it.scu.edu.au/api/";     //"http://localhost:3060/api/";

      //get
      public getAllDoctor():Observable<DoctorData>{
          alert('getAllDoctors: '+this.url);
          return this.http.get<DoctorData>(this.url);
      }

      //post
      public insertDoctor(docID:number,name:string,degree:string,qual:string,specID:number):Observable<DoctorData>{
          alert('insertDoctors: '+this.url);
          //taking one parameter (this.url) aka api locations --> getting the data to be sent.
          return this.http.post<DoctorData>(this.url,{"DOCTOR_ID":docID,"NAME":name,"MEDICALDEGREE":degree,"QUALIFICATION":qual,"SPECIALTY_ID":specID});
      }

      //put
      public updateDoctor(docID:number,name:string,degree:string,qual:string,specID:number):Observable<DoctorData>{
          alert('updateDoctors: '+this.url);
          //taking one parameter (this.url) aka api locations --> getting the data to be sent.
          return this.http.put<DoctorData>(this.url,{"DOCTOR_ID":docID,"NAME":name,"MEDICALDEGREE":degree,"QUALIFICATION":qual,"SPECIALTY_ID":specID});
      }

      //delete
      public deleteDoctor(docID:number):Observable<DoctorData>{
          alert('deleteDoctors: '+this.url);
          return this.http.delete<DoctorData>(this.url+"/"+docID);
      }









  }
