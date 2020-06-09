import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { AttendanceComponent } from './attendance.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    component: AttendanceComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }