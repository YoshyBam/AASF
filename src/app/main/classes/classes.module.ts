import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//routes
import { ClassesRoutingModule } from './classes-routing.module';

//other

//components
import { ClassesComponent } from './classes.component';
import { RemoveDialogComponent } from '../dailogs/remove-dialog/remove-dialog.component';

//angular


@NgModule({
  declarations: [ ClassesComponent, RemoveDialogComponent ],
  imports: [
    //angular
    CommonModule,
    FormsModule,


    //routing
    ClassesRoutingModule,
    
    //materials

    //other
    
  ],
})
export class ClassesModule { }