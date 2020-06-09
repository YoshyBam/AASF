import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//routes

//other
import { AmazingTimePickerModule } from 'amazing-time-picker';

//components
import { StartLectureComponent } from './start-lecture.component';
import { StartLectureRoutingModule } from './start-lecture-routing.module';

//angular
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [ StartLectureComponent ],
  imports: [
    //angular
    CommonModule,
    FormsModule,

    //routing
    StartLectureRoutingModule,
    
    //materials
    MatDatepickerModule,
    MatMomentDateModule,

    //other
    AmazingTimePickerModule,
    
  ]
})
export class StartLectureModule { }