import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//routes
//other

//components
import { StartLectureComponent } from './start-lecture.component';
import { StartLectureRoutingModule } from './start-lecture-routing.module';

//angular


@NgModule({
  declarations: [ StartLectureComponent ],
  imports: [
    //angular
    CommonModule,
    FormsModule,

    //routing
    StartLectureRoutingModule,
    
    //materials

    //other
    
  ]
})
export class StartLectureModule { }