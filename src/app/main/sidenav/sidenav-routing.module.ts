import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { SidenavComponent } from './sidenav.component';

const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [
      {
        path: '',
        pathMatch: 'prefix',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'classes',
        loadChildren: () => import('../classes/classes.module').then(m => m.ClassesModule)
      },
      {
        path: 'classes/add',
        loadChildren: () => import('../add-classes/add-classes.module').then(m => m.AddClassesModule)
      },
      {
        path: 'classes/single',
        loadChildren: () => import('../students/students.module').then(m => m.StudentsModule)
      },
      {
        path: 'classes/single/add',
        loadChildren: () => import('../add-student/add-student.module').then(m => m.AddStudentModule)
      },
      {
        path: 'lectures',
        loadChildren: () => import('../lectures/lectures.module').then(m => m.LecturesModule)
      },
      {
        path: 'lectures/single',
        loadChildren: () => import('../lectures/lecture/lecture.module').then(m => m.LectureModule)
      },
      {
        path: 'lectures/start',
        loadChildren: () => import('../lectures/start-lecture/start-lecture.module').then(m => m.StartLectureModule)
      },
      {
        path: 'lectures/check-in',
        loadChildren: () => import('../lectures/check-in/check-in.module').then(m => m.CheckInModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidenavRoutingModule { }