import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { ClassesComponent } from './classes.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    component: ClassesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule { }