import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//routes
import { SidenavRoutingModule } from './sidenav-routing.module';

//other

//components
import { SidenavComponent } from './sidenav.component';
import { RemoveDialogComponent } from '../dailogs/remove-dialog/remove-dialog.component';

//angular
import { MatSidenavModule } from '@angular/material/sidenav';
 

@NgModule({
  declarations: [ SidenavComponent ],
  imports: [
    //angular
    CommonModule,
    FormsModule,

    //routing
    SidenavRoutingModule,

    //materials
    MatSidenavModule

    //other
    
  ]
})
export class SidenavModule { }