import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//routes
import { StudentsRoutingModule } from './students-routing.module';

//other

//components
import { StudentsComponent } from './students.component';

//dialogs
import { RemoveDialogModule } from '../dailogs/remove-dialog/remove-dialog.module';

//angular


@NgModule({
  declarations: [ StudentsComponent ],
  imports: [
    //angular
    CommonModule,
    FormsModule,

    //routing
    StudentsRoutingModule,

    //dialogs
    RemoveDialogModule

    //materials

    //other
    
  ],
})
export class StudentsModule { }