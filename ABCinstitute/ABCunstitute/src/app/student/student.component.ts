import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {

 
  StudentArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
 
  name: string ="";
  address: string ="";
  contact: string ="";
  id:string="";
  currentStudentID = "";
 
  constructor(private http: HttpClient )
  {
    this.getAllStudent();
  }
 
  ngOnInit(): void {
  }
 
  getAllStudent()
  {
    this.http.get("http://localhost:8085/api/student/")
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.StudentArray = resultData.data;
    });
  }
 
 
  
 
 
  register()
  {

    let bodyData = {
      
      "name" : this.name,
      "address" : this.address,
      "contact" : this.contact,

    };
 
    this.http.post("http://localhost:8085/api/student/add",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Registered Successfully")
        this.getAllStudent();
      //  this.name = '';
      //  this.address = '';
      //  this.mobile  = 0;
    });
  }
 
  setUpdate(data: any)
  {
   this.name = data.name;
   this.address = data.address;
   this.contact = data.contact;
  
 
   this.currentStudentID = data.id;
  }
 
  UpdateRecords()
  {
    let bodyData =
    {
      "name" : this.name,
      "address" : this.address,
      "contact" : this.contact
    };
    
    this.http.put("http://localhost:8085/api/student/update"+ "/"+ this.currentStudentID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Registered Updateddd")
        this.getAllStudent();
      
    });
  }
  save()
  {
    if(this.currentStudentID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }      
 
  }
 
 
  setDelete(data: any)
  {
    this.http.delete("http://localhost:8085/api/student/delete"+ "/"+ data.id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Deletedddd")
        this.getAllStudent();
    });
  }
}


