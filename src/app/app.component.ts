import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,HttpClientModule,FormsModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'firsttest';

  tasks:any=[];
  newtask="";

  APIURL="http://localhost:8080/"

  constructor(private http:HttpClient){}

   ngOnInit(){
    this.get_tasks();
   }

    get_tasks(){
      this.http.get(this.APIURL+"get_tasks").subscribe((res)=>{
        this.tasks=res;
      })
    }

    add_tasks(){
      let body=new FormData();
      body.append('task',this.newtask);
      this.http.post(this.APIURL+"add_task",body).subscribe((res)=>{
        alert(res)
        this.newtask="";
        this.get_tasks()
      })
    }

    delete_task(task:any){
      let body=new FormData();
      body.append('task',task);
      this.http.post(this.APIURL+"delete_task",body).subscribe((res)=>{
        alert(res)
        this.get_tasks()
      })
    }
  
}
