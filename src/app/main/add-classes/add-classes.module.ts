import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//routes
import { AddClassesRoutingModule } from './add-classes-routing.module';

//other

//components
import { AddClassesComponent } from './add-classes.component';

//angular


@NgModule({
  declarations: [ AddClassesComponent ],
  imports: [
    //angular
    CommonModule,
    FormsModule,

    //routing
    AddClassesRoutingModule,
    
    //materials

    //other
    
  ]
})
export class AddClassesModule { }