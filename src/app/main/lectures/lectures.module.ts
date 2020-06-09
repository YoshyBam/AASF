import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//routes
import { LecturesRoutingModule } from './lectures-routing.module';

//other

//components
import { LecturesComponent } from './lectures.component';

//dialogs
import { RemoveDialogModule } from '../dailogs/remove-dialog/remove-dialog.module';

//angular


@NgModule({
  declarations: [ LecturesComponent ],
  imports: [
    //angular
    CommonModule,
    FormsModule,


    //routing
    LecturesRoutingModule,

    //dialogs
    RemoveDialogModule
    
    //materials

    //other
    
  ],
})
export class LecturesModule { }