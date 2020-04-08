import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//routes
import { HomeRoutingModule } from './home-routing.module';

//other

//components
import { HomeComponent } from './home.component';

//angular
 

@NgModule({
  declarations: [HomeComponent],
  imports: [
    //angular
    CommonModule,
    FormsModule,

    //routing
    HomeRoutingModule,

    //materials
    

    //other
    
  ]
})
export class HomeModule { }