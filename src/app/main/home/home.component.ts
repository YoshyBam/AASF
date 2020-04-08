import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

//services
import { authService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private authService: authService, private readonly router: Router) { }

  user_logout_subscription: Subscription; 

  ngOnInit() {

    this.user_logout_subscription = this.authService.user_logout_subject.subscribe({
      next: (res) => {
        
        if(res.error != null) {

          //handle error
          console.log(res);

        } else {

          //handle response
          console.log(res);

          this.authService.user = {
            username: null,
            access_token: null,
            refresh_token: null
          }
          
          this.router.navigate(['/login']);

        }

      }
    })

  }

  ngOnDestroy() {
    this.user_logout_subscription.unsubscribe();
  }

  logout() { this.authService.user_logout(); }
  

}
