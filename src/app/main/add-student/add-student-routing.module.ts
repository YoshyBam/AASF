import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import {  AddStudentComponent } from './add-student.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    component: AddStudentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddStudentRoutingModule { }