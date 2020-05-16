import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//routes
import { AddStudentRoutingModule } from './add-student-routing.module';

//other

//components
import { AddStudentComponent } from './add-student.component';

//angular


@NgModule({
  declarations: [ AddStudentComponent ],
  imports: [
    //angular
    CommonModule,
    FormsModule,

    //routing
    AddStudentRoutingModule,
    
    //materials

    //other
    
  ]
})
export class AddStudentModule { }