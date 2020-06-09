import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//routes
import { AttendanceRoutingModule } from './attendance-routing.module';

//other

//components
import { AttendanceComponent } from './attendance.component';

//dialogs

//angular


@NgModule({
  declarations: [ AttendanceComponent ],
  imports: [
    //angular
    CommonModule,
    FormsModule,

    //routing
    AttendanceRoutingModule,

    //dialogs

    //materials

    //other
    
  ],
})
export class AttendanceModule { }