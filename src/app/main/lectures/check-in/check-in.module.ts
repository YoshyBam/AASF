import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//routes

//other


//components
import { CheckInComponent } from './check-in.component';
import { CheckInRoutingModule } from './check-in-routing.module';

//angular



@NgModule({
  declarations: [ CheckInComponent ],
  imports: [
    //angular
    CommonModule,
    FormsModule,

    //routing
    CheckInRoutingModule,
    
    //materials

    //other
  ]
})
export class CheckInModule { }