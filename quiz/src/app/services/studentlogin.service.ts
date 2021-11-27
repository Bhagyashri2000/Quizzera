import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class StudentloginService {
  isLoggedIn=false

  constructor(public firebaseAuth:AngularFireAuth, @Inject('firebaseAuthProject2') private firebaseAuthProject2: AngularFireAuth,
  private httpClient:HttpClient) { }
  reload()
  {
    console.log('before reload')
    window.location.reload();
    console.log('after reload')

  }
  async signin(email:string, password:string){
    // await AngularFireModule.initializeApp(this.firebaseAuthProject2,"secondary");

    await this.firebaseAuthProject2.signInWithEmailAndPassword(email,password).then(res=>{
      this.isLoggedIn=true
      localStorage.setItem('student',JSON.stringify(res.user))
    })
  }
  getUserData(id)
  {
    var url='https://engage-d789f-default-rtdb.firebaseio.com/student_id/'+id+'.json'
    return this.httpClient.get<any>(url);
  }
  logout()
  {
    this.firebaseAuthProject2.signOut();
    localStorage.removeItem('student');
  }
}
