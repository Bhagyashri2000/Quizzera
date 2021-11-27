import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { NgbModule  } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { TeacherloginService } from './services/teacherlogin.service';
import { TeacherafterloginComponent } from './teacherafterlogin/teacherafterlogin.component';
import { environment } from "src/environments/environment";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { ReactiveFormsModule } from "@angular/forms";
import {CreatequizService} from './services/createquiz.service';
import { HttpClientModule } from '@angular/common/http';
import { StudentLoginComponent } from './student-login/student-login.component';
import { StudentafterloginComponent } from './studentafterlogin/studentafterlogin.component';
import { StudentloginService } from './services/studentlogin.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {
  AngularFireAuthProject1,
  AngularFireAuthProject2
} from './firebase.factory';
import {  PLATFORM_ID, NgZone, LOCALE_ID } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { GiveQuizComponent } from './give-quiz/give-quiz.component';



@NgModule({
  declarations: [
    AppComponent,
    CreateQuizComponent,
    TeacherLoginComponent,
    TeacherafterloginComponent,
    StudentLoginComponent,
    StudentafterloginComponent,
    HomeComponent,
    SignUpComponent,
    GiveQuizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    AngularFireAuthModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireModule.initializeApp({
    apiKey: "AIzaSyDey74bhe5EOMAtoiMhdpxpFbDN9_7jVjw",
    authDomain: "engage-d789f.firebaseapp.com",
    projectId: "engage-d789f",
    storageBucket: "engage-d789f.appspot.com",
    messagingSenderId: "791215305570",
    appId: "1:791215305570:web:c2300fb1e77ed0d105723b"}),

    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDUx0IfFk5z8h8WlX1Fcnz0FZo4nR8ZJmI",
      authDomain: "student-login-a3794.firebaseapp.com",
      projectId: "student-login-a3794",
      storageBucket: "student-login-a3794.appspot.com",
      messagingSenderId: "621341666199",
      appId: "1:621341666199:web:11a386138637b4b88532d2"}),
    AngularFireDatabaseModule,
    HttpClientModule
  ],
  providers: [TeacherloginService,CreatequizService,HttpClientModule,StudentloginService,{
    provide: 'env',
    useValue: environment
  },
  
  {
    provide: 'firebaseAuthProject1',
    deps: [PLATFORM_ID, NgZone],
    useFactory: AngularFireAuthProject1
  },

  {
    provide: 'firebaseAuthProject2',
    deps: [PLATFORM_ID, NgZone],
    useFactory: AngularFireAuthProject2
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
