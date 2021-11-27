import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQuizComponent} from '../app/create-quiz/create-quiz.component';
import { GiveQuizComponent } from './give-quiz/give-quiz.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { StudentafterloginComponent } from './studentafterlogin/studentafterlogin.component';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { TeacherafterloginComponent } from './teacherafterlogin/teacherafterlogin.component';

const routes: Routes = [
  {
    path:'teacherAfterLogin/createQuiz',component:CreateQuizComponent
  },
  {
    path:'',component:HomeComponent
  },
  
  {
    path:'studentAfterLogin/giveQuiz',component:GiveQuizComponent
  },
  {
    path:'studentLogin',component:StudentLoginComponent
  },
  {
    path:'studentAfterLogin',component:StudentafterloginComponent
  },
  {
    path:'signUp',component:SignUpComponent
  },
  {
    path:'teacherAfterLogin',component:TeacherafterloginComponent
  },
  {
    path:'teacherLogin',component:TeacherLoginComponent
  },
  {
    path:'giveQuiz',component:GiveQuizComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
