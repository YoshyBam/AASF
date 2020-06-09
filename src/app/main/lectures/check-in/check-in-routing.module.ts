import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { CheckInComponent } from './check-in.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    component: CheckInComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckInRoutingModule { }