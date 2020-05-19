import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';


//services
import { authService } from 'src/app/services/auth.service';
import { studentService } from 'src/app/services/subscribers/student.service'

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

  groupList: Array<{id: number, name: string}>

  user = {
    group_index: null,
    name: null,
    surname: null,
    username: null,
    password: null,
    confirm_password: null
  }

  user_login_subscription: Subscription;
  user_create_subscription: Subscription;

  getGroupListSubscription: Subscription;

  constructor(private authService: authService, private student: studentService, private readonly router: Router) {
    this.groupList = new Array<{id: number, name: string}>();
    this.student.getGroupList();
  }

  ngOnInit() {

    this.user_login_subscription = this.authService.user_login_subject.subscribe({

      next: (res) => {

        if(isNullOrUndefined(res.error)) {

          this.authService.access_token = res.tokens.access_token;
          this.authService.refresh_token = res.tokens.refresh_token;
          localStorage.setItem('accessToken', res.tokens.access_token.toString());
          localStorage.setItem('refreshToken', res.tokens.refresh_token.toString());
          this.authService.user = {
            academic_group_id: res.user.academic_group_id,
            name: res.user.name,
            surname: res.user.surname,
            role: res.user.role,
          };
          
          
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

    this.getGroupListSubscription = this.student.getAcademicGroupListSubject.subscribe({
      next: (res) => {

        if(isNullOrUndefined(res.error)) {

          this.groupList = res;

        } else {

          console.log(res);

        }

      }
    });

  }

  ngOnDestroy() {

    this.user_login_subscription.unsubscribe();
    this.user_create_subscription.unsubscribe();

  }

  validator() { if(this.user.group_index != null && this.user.group_index.toString() == "null") this.user.group_index = null; }

  //paths actions taken by login button
  gate() {

    if(this.forgot) {

      ///TODO
      //send forgot email

    } else if(this.sign_up) {

      this.authService.user_create(this.user.username, this.user.password, this.user.confirm_password, this.user.name, this.user.surname, this.groupList[this.user.group_index].id);

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
