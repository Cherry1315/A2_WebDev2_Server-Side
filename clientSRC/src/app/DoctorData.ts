

//declaring a class called DoctorData
export class DoctorData{
    //assigning types to the variables.
    DOCTOR_ID:number;
    NAME:string;
    MEDICALDEGREE:string;
    QUALIFICATION:string;
    SPECIALTY_ID:number;
    SPECIALTY_NAME:string; //instance/placeholder of NAME column (from specialty table within hospital_db) from the SQL code within api-controller.js

    //constructor for DoctorData with 6 parameters
    constructor(docID:number,name:string,degree:string,qual:string,specID:number,specName:string){
        //initialising the variables
        this.DOCTOR_ID=docID;
        this.NAME=name;
        this.MEDICALDEGREE=degree;
        this.QUALIFICATION=qual;
        this.SPECIALTY_ID=specID;
        this.SPECIALTY_NAME=specName;
    }
}
