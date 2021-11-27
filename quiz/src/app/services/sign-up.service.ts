import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  isLoggedIn = false
  constructor(public firebaseAuth: AngularFireAuth, @Inject('firebaseAuthProject1') private firebaseAuthProject1: AngularFireAuth,
    private httpClient: HttpClient,
    private firestore: AngularFirestore
  ) { }

  async signup_teacher(email: string, password: string, name: string,  subject: string) {
    await this.firebaseAuthProject1.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.firebaseAuthProject1
        this.isLoggedIn = true
        localStorage.setItem('user', JSON.stringify(res.user))
        this.insertData_teacher1(res.user.uid, name, subject).subscribe(
          (response)=>console.log(response),
          (err)=>console.log(err))
          this.insertData_teacher2(res.user.uid, name, subject).subscribe(
            (response)=>console.log(response),
            (err)=>console.log(err))

      })

  }
  async signup_student(email: string, password: string, name: string, class_name: string) {
    await this.firebaseAuthProject1.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.firebaseAuthProject1
        this.isLoggedIn = true
        localStorage.setItem('user', JSON.stringify(res.user))
        this.insertData_student1(res.user.uid, name, class_name).subscribe(
          (response)=>console.log(response),
          (err)=>console.log(err))
          this.insertData_student2(res.user.uid, name, class_name).subscribe(
            (response)=>console.log(response),
            (err)=>console.log(err))

      })
      

  }
  insertData_student1(id, name_student, class_name)
  {
      var data:any;
      data = Object.assign({}, {
        name: name_student,
        class:class_name
    });
      var url='https://engage-d789f-default-rtdb.firebaseio.com/student_class/'+class_name+'/'+id+'.json'
      // this.insertData_student2(id, name_student, class_name);
  
      return this.httpClient.put<string>(url,data)
  
  }
  insertData_student2(id, name_student, class_name)
  {
      var data:any;
      data = Object.assign({}, {
        name: name_student,
        class:class_name
    });
      var url='https://engage-d789f-default-rtdb.firebaseio.com/student_id/'+id+'.json'
  
      return this.httpClient.put<string>(url,data)
  
  }
  insertData_teacher1(id, name_teacher, subj)
  {
      var data:any;
      data = Object.assign({}, {
        name: name_teacher,
        subject:subj
    });
    // this.insertData_teacher2(id, name_teacher, subj)

      var url='https://engage-d789f-default-rtdb.firebaseio.com/teacher_subj/'+subj+'/'+id+'.json'
  
      return this.httpClient.put<string>(url,data)
  
  }
  insertData_teacher2(id, name_teacher, subj)
  {
      var data:any;
      data = Object.assign({}, {
        name: name_teacher,
        subject:subj
    });
      var url='https://engage-d789f-default-rtdb.firebaseio.com/teacher_id/'+id+'.json'
  
      return this.httpClient.put<string>(url,data)
  
  }
  
  logout() {
    this.firebaseAuthProject1.signOut();
    localStorage.removeItem('user');
  }
}
