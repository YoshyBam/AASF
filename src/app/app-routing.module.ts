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
        pathMatch: 'full',
        loadChildren: () => import('./main/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./main/home/home.module').then(m => m.HomeModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

