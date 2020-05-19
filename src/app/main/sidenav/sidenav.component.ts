import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

//services
import { authService } from 'src/app/services/auth.service';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  constructor(private authService: authService, private readonly router: Router) { 


    let token = localStorage.getItem('refreshToken');
    if(!isNullOrUndefined(token))
      this.timer = setInterval(() => this.authService.refreshSession(token), 5 * 60 * 1000);

  }

  timer;

  user_logout_subscription: Subscription; 
  refreshSessionSubscription: Subscription;

  ngOnInit() {

    this.user_logout_subscription = this.authService.user_logout_subject.subscribe({
      next: (res) => {
        
        if(res.error != null) {

          //handle error
          console.log(res);

        } else {

          //handle response
          console.log(res);

          this.authService.access_token = null;
          this.authService.refresh_token = null;
          this.authService.user = null;

          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          
          this.router.navigate(['/login']);

        }

      }
    });

    this.refreshSessionSubscription = this.authService.refreshSessionSubject.subscribe({
      next: (res) => {

        if(isNullOrUndefined(res.error)) {

          console.log(res);

          this.authService.access_token = res.tokens.access_token;
          this.authService.refresh_token = res.tokens.refresh_token;
          localStorage.setItem('accessToken', res.tokens.access_token.toString());
          localStorage.setItem('refreshToken', res.tokens.refresh_token.toString());
          this.authService.user = {
            id: res.user.id,
            academic_group_id: res.user.academic_group_id,
            name: res.user.name,
            surname: res.user.surname,
            role: res.user.role,
          };

        } else {

          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');

          this.router.navigate(['/login'])

        }

      }
    });

  }

  ngOnDestroy() {
    clearInterval(this.timer);
    this.user_logout_subscription.unsubscribe();
    this.refreshSessionSubscription.unsubscribe();
  }

  logout() { this.authService.user_logout(); }
  

}
