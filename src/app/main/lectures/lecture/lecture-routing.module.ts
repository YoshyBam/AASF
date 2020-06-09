import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { LectureComponent } from './lecture.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    component: LectureComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LectureRoutingModule { }