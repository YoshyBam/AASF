import { Component } from '@angular/core';
import { authService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent {
  constructor(public auth: authService, private router: Router) {

    switch(this.auth.user.role) {
      case "student" : 
        break;
      case "teacher" : 
        break;
      case "admin" : 
        break;
      default : 
        this.router.navigate(['/login']);
        break;
    }
  }
}
