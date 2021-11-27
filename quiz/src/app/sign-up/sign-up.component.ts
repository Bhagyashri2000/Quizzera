
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService } from '../services/sign-up.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isSignedIn = true;
  errorMsg='';
  success=false;
  signUp=false;
  role='';
  class='';
  subject=''
  

  constructor(public signUpService:SignUpService,
    private _router:Router) { }

  ngOnInit(): void {
  }
  reload()
  {
    window.location.reload();

  }
  changeEvent_role($event)
  {
    console.log(!this.errorMsg)
    console.log($event.target.value)
    this.role=$event.target.value
  }
  changeEvent_class($event)
  {
    console.log($event.target.value)
    this.class=$event.target.value
  }

  changeEvent_subject($event)
  {
    console.log($event.target.value)
    this.subject=$event.target.value
  }
  onclick()
  {
    if(this.role=='Student')
      this._router.navigate(['studentLogin']);
    else
      this._router.navigate(['teacherLogin']);
  }

  async onSignup(email: string, password: string, name:string) {
    if(this.role=='Student')
      await this.signUpService.signup_student(email, password, name,  this.class)
      .catch((error) => {
        console.log(error)
        this.success=false
        switch (error.code) {
          case "auth/invalid-email":
            {
              this.errorMsg = "Invalid Email";
              break;
            }
          case "auth/weak-password":
            {
              this.errorMsg = "Weak Password- Password should be of atleast 6 letters";
              break;
            }
          case "auth/user-not-found":
            {
              this.errorMsg = "Wrong email address or password.";
              break;
            }
          case "auth/email-already-in-use":
            {
              this.errorMsg = "Email address already in use";
              break;
            }
          default:
            {
              this.errorMsg = "Unexpected Error";
              break;
            }
        }
      });
    else
      await this.signUpService.signup_teacher(email, password, name,  this.subject)
    .catch((error) => {
        console.log(error)
        this.success=false
        switch (error.code) {
          case "auth/invalid-email":
            {
              this.errorMsg = "Invalid Email";
              break;
            }
          case "auth/weak-password":
            {
              this.errorMsg = "Weak Password- Password should be of atleast 6 letters";
              break;
            }
          case "auth/user-not-found":
            {
              this.errorMsg = "Wrong email address or password.";
              break;
            }
          case "auth/email-already-in-use":
            {
              this.errorMsg = "Email address already in use";
              break;
            }
          default:
            {
              this.errorMsg = "Unexpected Error";
              break;
            }
        }
      });
      
    if (this.signUpService.isLoggedIn)
      this.isSignedIn = true;
      this.success=true
      if(this.errorMsg=='')
      {
        this.onclick();
  
      }
    
  }
 

}
