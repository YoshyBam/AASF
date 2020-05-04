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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidenavRoutingModule { }