import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//routes
import { LectureRoutingModule } from './lecture-routing.module';

//other

//components
import { LectureComponent } from './lecture.component';

//dialogs
import { RemoveDialogModule } from '../../dailogs/remove-dialog/remove-dialog.module';

//angular


@NgModule({
  declarations: [ LectureComponent ],
  imports: [
    //angular
    CommonModule,
    FormsModule,


    //routing
    LectureRoutingModule,

    //dialogs
    RemoveDialogModule,
    
    //materials

    //other
    
  ],
})
export class LectureModule { }