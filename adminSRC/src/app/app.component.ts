  import { Component } from '@angular/core';

  import { DoctorData } from './DoctorData';

  import { DataService } from './data.service';

  @Component({
    selector: 'app-root',
    //templateUrl: './app.component.html',
    template: `<h2>List of Doctors</h2><br>

        <table id="doctorsTab" *ngIf="allDoctor.length > 0">           <!--Creating a table with an id called doctorsTab. ngIf is an angular condition that affects the DOM (via removing or adding elements. We are adding elements) Calls upon allDoctor array and gets the length of the array.-->
          <tr>
            <th>ID</th>            <!--th is a table heading cell.-->
            <th>Name</th>
            <th>Medical Degree</th>
            <th>Qualification(s) </th>
            <th>Specialty ID</th>
            <th>Specialty Name</th>
            <th>Delete Doctor</th>
          </tr>
          <tr *ngFor="let doctor of allDoctor">           <!--tr is table row. Within this area we are getting (ngFor) all the doctors. This is done by iterating/looping through all the doctor elements withing the allDoctor array .-->
            <td>{{doctor.DOCTOR_ID}}</td>           <!--td is a table data cell. Angular syntax for angular templates. within the curly brackets we are getting the doctor id within the doctor table. -->
            <td>{{doctor.NAME}}</td>
            <td>{{doctor.MEDICALDEGREE}}</td>
            <td>{{doctor.QUALIFICATION}}</td>
            <td>{{doctor.SPECIALTY_ID}}</td>
            <td>{{doctor.SPECIALTY_NAME}}</td>
            <td><a href="#" (click)="deleteDoctor(doctor.DOCTOR_ID)">Delete</a></td>            <!--hyperlink that goes no where (#) but does do a function/binding (click) -- aka deletes a doctor. Gets the doctor id that the array had iterated through and deletes that particular doctor. -->
          </tr>
          {{ errMessage }}<br><br>
        </table>



      <div class="container">           <!--container for the form so the forms can be manipulated further. So the forms can sit side by side like columns (done in CSS)-->

        <form #createNewDoctorForm="ngForm" (ngSubmit)="insertDoctor()">           <!--A form to create new doctors. ngForm provides function by enabling the ngSubmit which binds our insertDoctor() method. Aka upon submission insertDoctor will be called -->
          <h2>Create a new doctor</h2><br>           <!--Header for the whole form-->
          <div>
            <!--labels -- aka the headers/titles for the input areas. -->
            <label>
              Doctor ID:
            </label>


            <input type="text" value="" [(ngModel)]=id_new name="id_new" placeholder="Input ID"><br>           <!--implementing text input areas. ngModel is two-way binding. Binding to id_new variable (aka a new doctor)-->
          </div>
          <div>
            <label>
              Doctor Name:
            </label>
            <input type="text" value="" [(ngModel)]=name_new name="name_new" placeholder="Input Doctor Name"><br>
          </div>
          <div>
            <label>
              Medical Degree:
            </label>
            <input type="text" value="" [(ngModel)]=degree_new name="degree_new" placeholder="Input Medical Degree"><br>
          </div>
          <div>
            <label>
              Qualification(s):
            </label>
             <input type="text" value="" [(ngModel)]=qualification_new name="qualification_new" placeholder="Input Qualifications"><br>
          </div>
          <div>
            <label>
              Specialty ID:
            </label>
            <input type="text" value="" [(ngModel)]=specialtyID_new name="specialtyID_new" placeholder="Input Specialty ID"><br>
          </div>

          <button class="button" type="submit">Add Doctor</button><br>           <!--calls established method when button is pressed (originating from ngSubmit)-->
          {{ errMessage2 }}<br><br>            <!--error message encase something goes wrong. Uses Angular syntax to insert into the HTML-->
        </form>


        <form #updateDoctorForm="ngForm" (ngSubmit)="updateDoctor()">           <!--A form to create edit/update doctors. ngForm provides function by enabling the ngSubmit which binds our updateDoctor() method. Aka upon submission updateDoctor will be called -->
          <h2>Update doctor</h2><br>
          <div>
            <label>
              Doctor ID:
            </label>
            <input type="text" value="" [(ngModel)]=id_update name="id_update" placeholder="Input ID"><br>           <!--implementing text input areas. ngModel is two-way binding. Binding to id_update variable (aka update id...even though there are validations further down the code preventing changes to ID)-->
          </div>
          <div>
            <label>
              Doctor Name:
            </label>
            <input type="text" value="" [(ngModel)]=name_update name="name_update" placeholder="Input Doctor Name"><br>
          </div>
          <div>
            <label>
              Medical Degree:
            </label>
            <input type="text" value="" [(ngModel)]=degree_update name="degree_update" placeholder="Input Medical Degree"><br>
          </div>
          <div>
            <label>
            Qualification(s):
            </label>
            <input type="text" value="" [(ngModel)]=qualification_update name="qualification_update" placeholder="Input Qualifications"><br>
          </div>
          <div>
            <label>
              Specialty ID:
            </label>
            <input type="text" value="" [(ngModel)]=specialtyID_update name="specialtyID_update" placeholder="Input Specialty ID"><br>
          </div>
          <button class="button" type="submit">Update Doctor</button><br>
            {{ errMessage3 }}<br><br>
        </form>

      </div>


    `,
  styleUrls: ['./app.component.css']

  })


  //class declaration. Makes whats stated within this class accessible to other files.
  export class AppComponent {
    title = 'myApp';

    //declaring an array called allDoctor that gets DoctorData (array) elements. Creates/initialises a new array.
    allDoctor:DoctorData[]=new Array();

    errMessage:string="";

    //to be able to create new elements of a doctor
    id_new:string="";
    name_new:string="";
    degree_new:string="";
    qualification_new="";
    specialtyID_new="";
    errMessage2:string="";

    //to be able to update elements of a doctor
    id_update:string="";
    name_update:string="";
    degree_update:string="";
    qualification_update="";
    specialtyID_update="";
    errMessage3:string="";

    //to be able to delete a doctor
    id_delete:string="";
    errMessage4:string="";


    //constructor with one (private) parameter. parameter variable is being assigned as type DataService.
    constructor(private dataService: DataService){
    }
    //an Angular lifestyle hook. Automatically calls a method on page load (calls upon getAllDoctor() for our table of doctors)
    ngOnInit(){
      this.getAllDoctor();
    }

    //a method called getAllDoctor that has no parameters.
    getAllDoctor(){
      //calls getAllDoctor from dataService. Has a subscribe observable to listen to events.
      this.dataService.getAllDoctor().subscribe(
        //gets all data call in regards to allDoctor.
        (d:any)=>{
          this.allDoctor=d;
        },
        //error call encase of any errors
        (err:any)=>{
          alert('err');
          console.log(err.message);
          this.errMessage="There was an error with retrieving the data";
        }
      );
    }

    //a method called insertDoctor with no parameters
    insertDoctor(){
      /**
          using the RegExp Object so I can specify my own set of special characters (that i will check for in my validations)...
          within my validateForm function. (This was technically unnecessary as assignment did not ask for this type of special
          character validation/check. But wanted to try for understanding for the email validation.... which was too complicated at this time.)
      **/
      let charsExcluded = /[\<\/\\!@#$%^&*()_+={}[\]|>?]/g;
      //declaring a variable called isFormValid and assigning it to be true.
      let isFormValid = true;

      if (!this.id_new || !this.name_new || !this.degree_new || !this.qualification_new || !this.specialtyID_new) {
        this.errMessage2 = "Fields cannot be empty.";
        return;
      } else if (/\d/g.test(this.name_new)) {
        this.errMessage2 = "Name cannot contain a number.";
        isFormValid = false;
        return;
      } else if (charsExcluded.test(this.name_new)) {
        this.errMessage2 = "Name cannot contain a special character.";
        isFormValid = false;
        return;
      } else if (!/\d/g.test(this.id_new) || !/\d/g.test(this.specialtyID_new)) {
         this.errMessage2 = "ID must contain only numerals.";
         isFormValid = false;
         return;
      } else if (this.allDoctor.some(doctor => doctor.DOCTOR_ID === parseInt(this.id_new))) {
        this.errMessage2 = "ID already exists.";
        isFormValid = false;
        return;
      } else if (this.name_new.length < 2) {
        this.errMessage2 = "Name cannot be less than 2 characters.";
        isFormValid = false;
        return;
      }

      this.dataService.insertDoctor(parseInt(this.id_new), this.name_new, this.degree_new, this.qualification_new, parseInt(this.specialtyID_new)).subscribe(
        (d:any)=>{
          alert("Data inserted");
          this.errMessage2="Insertion is successful";
          //reload/recall getAllDoctor the data after inserting
          this.getAllDoctor();
        },
        (err:any)=>{
          alert('err');
          console.log(err.message);
          this.errMessage2="There was an error while inserting the data";
        }
      );
    }


    updateDoctor(){
      /**
          using the RegExp Object so I can specify my own set of special characters (that i will check for in my validations)...
          within my validateForm function. (This was technically unnecessary as assignment did not ask for this type of special
          character validation/check. But wanted to try for understanding for the email validation.... which was too complicated at this time.)
      **/
      let charsExcluded = /[\<\/\\!@#$%^&*()_+={}[\]|>?]/g;
      //declaring a variable called isFormValid and assigning it to be true.
      let isFormValid = true;

      //VALIDATIONS BELOW:
      //if statement checking if the values are empty.
      if (!this.id_update || !this.name_update || !this.degree_update || !this.qualification_update || !this.specialtyID_update) {
        this.errMessage3 = "Fields cannot be empty.";
        return;
      }
        /*  else if statement checking that the inputted ID is in existence within the database: getting my allDoctor array. using the some()
        method to check for a certain element (doctor) in the array. Arrow functioning the method within some() to see if
        DOCTOR_ID is the same/equals as id_update.  */
       else if (!this.allDoctor.some(doctor => doctor.DOCTOR_ID === parseInt(this.id_update))) {
        this.errMessage3 = "ID doesn't exist.";
        //assigning isFormValid to be false
        isFormValid = false;
        return;
        //checking with our set variable called charsExcluded to see if person has inputted any values that are not wanted
      } else if (charsExcluded.test(this.name_update)) {
        this.errMessage3 = "Name cannot contain a special character.";
        isFormValid = false;
        return;
        //checking is there are any numbers have been inputted
      } else if (/\d/g.test(this.name_update)) {
        this.errMessage3 = "Name cannot contain a number.";
        isFormValid = false;
        return;
        //checking if the length of the name has 2 or more characters.
      } else if (this.name_update.length < 2) {
        this.errMessage3 = "Name cannot be less than 2 characters.";
        isFormValid = false;
        return;
        //checking if inputted number is no less than one OR not greater than 5
      } else if (parseInt(this.specialtyID_update) < 1 || parseInt(this.specialtyID_update) > 5) {
        this.errMessage3 = "Specialty ID can only be between 1 and 5";
        isFormValid = false;
        //checking if the id only has numbers
      } else if (!/\d/g.test(this.specialtyID_update)) {
         this.errMessage3 = "ID must contain only numerals.";
         isFormValid = false;
         return;
      }

      //calling the updateDoctor method with 5 parameters (parseInt converts text to numerals). Return observable, with subscribe as the event listener. Arrow functioning alerts/errorMessage/getAllDoctors() method.
      this.dataService.updateDoctor(parseInt(this.id_update), this.name_update, this.degree_update, this.qualification_update, parseInt(this.specialtyID_update)).subscribe(
        (d:any)=>{
          alert("Data updated");
          this.errMessage3="Update is successful";
          //reload/recall getAllDoctor data after update
          this.getAllDoctor();
        },
        (err:any)=>{
          alert('err');
          console.log(err.message);
          this.errMessage3="There was an error while updating the data";
        }
      );
    }

    //method called deleteDoctor with one parameter called docID. DocID variable is being assigned as type number.
    deleteDoctor(docID: number){
    //checking/confirming if they meant to delete item/doctor.
      if(confirm("are you sure you want to delete ID " +docID)){

      //calling the deleteDoctor method usind the doctors id.
      this.dataService.deleteDoctor(docID).subscribe(
        (d:any)=>{
          alert("Data successfully deleted");
          this.errMessage4="Successfully deleted";
          //reload/recall getAllDoctor data after deleting.
          this.getAllDoctor();
        },
        (err:any)=>{
          alert('err');
          console.log(err.message);
          this.errMessage4="There was an error deleting the data";
        }
      );
    }
  }


}
