import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//routes
import { DashboardRoutingModule } from './dashboard-routing.module';

//other

//components
import { DashboardComponent } from './dashboard.component';

//angular
 

@NgModule({
  declarations: [ DashboardComponent ],
  imports: [
    //angular
    CommonModule,
    FormsModule,

    //routing
    DashboardRoutingModule,

    //materials

    //other
    
  ]
})
export class DashboardModule { }