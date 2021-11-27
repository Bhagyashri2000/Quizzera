import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class TeacherloginService {

  isLoggedIn=false
  constructor(public firebaseAuth:AngularFireAuth, @Inject('firebaseAuthProject1') private firebaseAuthProject1: AngularFireAuth,
  private httpClient:HttpClient
  ) { }
  async signin(email:string, password:string){

    await this.firebaseAuthProject1.signInWithEmailAndPassword(email,password).then(res=>{
      this.isLoggedIn=true
      localStorage.setItem('teacher',JSON.stringify(res.user))
    })
  }
  getUserData(id)
  {
    var url='https://engage-d789f-default-rtdb.firebaseio.com/teacher_id/'+id+'.json'
    return this.httpClient.get<any>(url);
  }
  getStudentNames()
  {
    var url='https://engage-d789f-default-rtdb.firebaseio.com/student_class.json'
    return this.httpClient.get<any>(url);
  }

  logout()
  {
    this.firebaseAuthProject1.signOut();
    localStorage.removeItem('teacher');
  }
}
