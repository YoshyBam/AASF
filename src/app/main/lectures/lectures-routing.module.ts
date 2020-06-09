import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { LecturesComponent } from './lectures.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    component: LecturesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LecturesRoutingModule { }