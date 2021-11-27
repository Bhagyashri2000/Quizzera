import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StudentloginService } from '../services/studentlogin.service';
import { Router } from '@angular/router';
import {CreatequizService} from '../services/createquiz.service'

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {

  isSignedIn = false;
  errorMsg;
  

  constructor(public studentLogin:StudentloginService,
    private _router:Router,public createquizService: CreatequizService,) { }

  ngOnInit(): void {
    this.createquizService.delCurrentMarks().subscribe(data=>{
        })

    if (localStorage.getItem('student') != null)
    {
      this.isSignedIn = true;
      
      this._router.navigate(['../studentAfterLogin']);
    }
    else
      this.isSignedIn = false;
    
  }
  reload()
  {
    window.location.reload();

  }
  
  async onSignin(email: string, password: string) {
    this.errorMsg = ""
    await this.studentLogin.signin(email, password)
    .then(res=>{
          this.isSignedIn=true;
          this.onclick()
        })
      .catch((error) => {
        switch (error.code) {

          case "auth/wrong-password":
            {
              this.errorMsg = "You have entered wrong password";
              // setTimeout(()=>this.errorMsg='',5000);
              // window.location.reload()
              break;
            }

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
  //   if (this.studentLogin.isLoggedIn)
  //     this.isSignedIn = true;
  }

  handleLogout() {
    this.isSignedIn = false;
  }

  onclick()
  {
    if(this.isSignedIn) 
     this._router.navigate(['../studentAfterLogin']);
  }
}
