import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//routes
import { LoginRoutingModule } from './login-routing.module';

//other

//components
import { LoginComponent } from './login.component';

//angular
 

@NgModule({
  declarations: [LoginComponent],
  imports: [
    //angular
    CommonModule,
    FormsModule,

    //routing
    LoginRoutingModule,

    //materials
    

    //other
    
  ]
})
export class LoginModule { }