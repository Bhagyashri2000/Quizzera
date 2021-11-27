import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { TeacherloginService } from '../services/teacherlogin.service';
import { Router } from '@angular/router'
import { CreatequizService } from '../services/createquiz.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-teacherafterlogin',
  templateUrl: './teacherafterlogin.component.html',
  styleUrls: ['./teacherafterlogin.component.css']
})
export class TeacherafterloginComponent implements OnInit {
  @ViewChild('addQuestionModal') addQuestionModal: ModalDirective;


  // @Output() isLogout=new EventEmitter ()
  isLogout;
  teacherData: any[] = []
  marks: any[] = []
  studentMarks: any[] = []
  classes = []
  showMarks = false;
  showStudent = false;
  studentMarks1=new Map()

  constructor(public teacherLoginService: TeacherloginService,
    public _router: Router, public createquizService: CreatequizService,) { }
  teacher_name = ''
  subject = ''

  ngOnInit(): void {
    
    var user = localStorage.getItem('teacher')
    this.teacherLoginService.getUserData(JSON.parse(user).uid).subscribe(data => {
      this.teacher_name = data.name;
      this.subject = data.subject;
    })


  }
  ShowMarks() {
    this.showStudent = false;
    this.showMarks = true;
  }
  ShowStudent() {
    this.showStudent = true;
    this.showMarks = false;
  }
  getStudentNames() {

  }
  getStudentMarks() {
    this.classes = []
    this.studentMarks = []
    this.createquizService.getMarks(this.subject).subscribe(data => {
      if(data==null)
      {
        alert('No data available')
        return;
      }
      for (var i of Object.keys(data)) {
        this.classes.push(i)
      }
      
      var cnt:number=0
        for(var m of Object.values(data))
        {
          this.studentMarks1.set(Object.keys(data)[cnt],m)
          cnt++;
        }
        

      for (var j of Object.values(data)) {

        for (var k of Object.values(j)) {
          this.studentMarks.push({
            marks: k['marks'],
            name: k['name'],
            totalMarks:k['totalMarks']
          })
        }

      }
    })
  }
  logout() {
    this.teacherLoginService.logout();
    this.isLogout = true;
    this._router.navigate(['../']);
  }


}
