import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


//services
import { authService } from 'src/app/services/auth.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  forgot: boolean = false;
  sign_up:boolean = false;
  
  username_text: string = "username";
  login_text: string = "Login";

  forgot_text: string = "Forgot password?";
  sign_up_text: string = "Sign up";

  user = {
    name: null,
    surname: null,
    username: null,
    password: null,
    confirm_password: null
  }

  user_login_subscription: Subscription;
  user_create_subscription: Subscription;

  constructor(private authService: authService, private readonly router: Router) { }

  ngOnInit() {

    this.user_login_subscription = this.authService.user_login_subject.subscribe({

      next: (res) => {

        if(isNullOrUndefined(res.error)) {
          console.log(res);
          this.authService.user.access_token = res.access_token;
          this.authService.user.refresh_token = res.refresh_token;

          console.log(this.authService.user);
          
          ///TODO
          this.router.navigate(['/']);
          

        } else {

          ///TODO
          //handle error
          console.log("Error in Login:", res);
          

        }

      }

    });

    this.user_create_subscription = this.authService.user_create_subject.subscribe({
      
      next: (res) => {

        if(res.error != null) {

          ///TODO
          //handle error
          console.log("Error in user creation:", res);

        } else {

          ///TODO
          //handle response
          console.log("Response from creation:", res);          

        }

      }

    });

  }

  ngOnDestroy() {

    this.user_login_subscription.unsubscribe();
    this.user_create_subscription.unsubscribe();

  }

  //paths actions taken by login button
  gate() {

    if(this.forgot) {

      ///TODO
      //send forgot email

    } else if(this.sign_up) {

      this.authService.user_create(this.user.username, this.user.password, this.user.confirm_password, this.user.name, this.user.surname);

    } else {

      this.authService.user_login(this.user.username, this.user.password);

    }


    this.return_to_login;

  }


  //return original data
  return_to_login() {
    this.forgot = false;
    this.sign_up = false;
    this.username_text = "username";
    this.login_text = "Login";
  }

  //changes button data on press 
  signUp_button() {

    if(!this.sign_up) {

      this.return_to_login();
      this.sign_up = true; 
      this.username_text = 'enter KTU email'; 
      this.login_text = 'Sign up'
      this.sign_up_text ="Login";


    } else this.return_to_login();
    
  }

  forgot_button() {

    if(!this.forgot) {

      this.return_to_login();
      this.forgot = true; 
      this.username_text = 'enter email'; 
      this.login_text = 'send'
      this.forgot_text = "Login";

    } else this.return_to_login();

  }

}
