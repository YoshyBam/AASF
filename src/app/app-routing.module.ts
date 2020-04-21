import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OutletComponent } from './outlet/outlet.component';


// components

const routes: Routes = [
  {
    path: '',
    component: OutletComponent,
    children: [
      {
        path: '',
        pathMatch: 'prefix',
        loadChildren: () => import('./main/sidenav/sidenav.module').then(m => m.SidenavModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./main/login/login.module').then(m => m.LoginModule)
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

