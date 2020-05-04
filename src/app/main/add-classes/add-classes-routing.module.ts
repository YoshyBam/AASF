import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import {  AddClassesComponent } from './add-classes.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    component: AddClassesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddClassesRoutingModule { }