import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//routes
import { ClassesRoutingModule } from './classes-routing.module';

//other

//components
import { ClassesComponent } from './classes.component';

//dialogs
import { RemoveDialogModule } from '../dailogs/remove-dialog/remove-dialog.module';

//angular


@NgModule({
  declarations: [ ClassesComponent ],
  imports: [
    //angular
    CommonModule,
    FormsModule,


    //routing
    ClassesRoutingModule,

    //dialogs
    RemoveDialogModule
    
    //materials

    //other
    
  ],
})
export class ClassesModule { }