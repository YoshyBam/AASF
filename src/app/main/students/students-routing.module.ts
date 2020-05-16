import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { StudentsComponent } from './students.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    component: StudentsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }