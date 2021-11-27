import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TeacherloginService } from '../services/teacherlogin.service';
import { Router } from '@angular/router';
import { TeacherafterloginComponent } from '../teacherafterlogin/teacherafterlogin.component';


@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.css']
})
export class TeacherLoginComponent implements OnInit {


  isSignedIn = false;
  errorMsg;


  constructor(public teacherLogin: TeacherloginService,
    private _router:Router) { }
    

  ngOnInit(): void {
    if (localStorage.getItem('teacher') != null)
    {
      this.isSignedIn = true;
      this._router.navigate(['../teacherAfterLogin']);
    }
      
    else
      this.isSignedIn = false;
    // if(this.isSignedIn) 
      // this._router.navigate(['../teacherAfterLogin']);
  }
  
  reload()
  {
    window.location.reload()
  }
  async onSignin(email: string, password: string) {
    this.errorMsg = ""
    await this.teacherLogin.signin(email, password)
    .then(res=>{
      this.isSignedIn=true;
      this.onclick()
    })
      .catch((error) => {
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
          case "auth/wrong-password":
            {
              this.errorMsg = "You have entered wrong password";
              
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
    if (this.teacherLogin.isLoggedIn)
      this.isSignedIn = true;
  }
  onclick()
  {
    if(this.isSignedIn) 
     this._router.navigate(['../teacherAfterLogin']);
  }

  handleLogout() {

    this.isSignedIn = false;
  }

}
