import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { StartLectureComponent } from './start-lecture.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    component: StartLectureComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartLectureRoutingModule { }