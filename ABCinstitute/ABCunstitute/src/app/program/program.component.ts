import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent {

  StudentArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
 
  stname: string ="";
  course: string ="";
  fee: string ="";
  currentStudentID = "";
 
  constructor(private http: HttpClient )
  {
    this.getAllStudent();
  }
 
  ngOnInit(): void {
  }
 
  getAllStudent()
  {
    this.http.get("http://localhost:8085/api/program/")
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.StudentArray = resultData.data;
    });
  }
 
 
  
 
 
  register()
  {
   // this.isLogin = false;
   // alert("hi");
    let bodyData = {
      "stname" : this.stname,
      "course" : this.course,
      "fee" : this.fee,
    };
 
    this.http.post("http://localhost:8085/api/program/add",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Registered Successfully")
        this.getAllStudent();
    
    });
  }
 
  setUpdate(data: any)
  {
   this.stname = data.stname;
   this.course = data.course;
   this.fee = data.fee;
  
 
   this.currentStudentID = data.id;
  }
 
  UpdateRecords()
  {
    let bodyData =
    {
      "stname" : this.stname,
      "course" : this.course,
      "fee" : this.fee
    };
    
    this.http.put("http://localhost:8085/api/program/update"+ "/"+ this.currentStudentID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("programs Registered Updateddd")
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
    this.http.delete("http://localhost:8085/api/program/delete"+ "/"+ data.id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("program Deletedddd")
        this.getAllStudent();
    });
  }
}
