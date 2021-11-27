import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { Question } from 'src/question';
import {Router} from '@angular/router';
import { CreatequizService } from '../services/createquiz.service';
import { StudentloginService } from '../services/studentlogin.service';
import { NgbDropdown} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-studentafterlogin',
  templateUrl: './studentafterlogin.component.html',
  styleUrls: ['./studentafterlogin.component.css']
})
export class StudentafterloginComponent implements OnInit {

  @ViewChild('getQuizModal') getQuizModal : ModalDirective;
  @ViewChild('resultModal') resultModal : ModalDirective;
  @ViewChild('code') examCode: ElementRef;

  constructor(public createquizService: CreatequizService,
    public _router:Router,
    public studentLoginService:StudentloginService) { }
  questions:Question[]=[]
  marks=0;
  student_name=''
  _class=''
  subject
  subjects=[]
  currentQuiz
  id
  holder=''
  displayStyle = "none";
  examType;
  quizSubject='';

  fieldsChange($event)
  {
    this.examType=$event.currentTarget.value;
  }
  showPopup(subj) {
    this.quizSubject=subj;
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }


  showModal()
  {
    this.resultModal.show();
  }
  getQuiz()
  {
    this.createquizService.getQuiz().subscribe((res)=>{
    const data=JSON.stringify(res)
    this.questions=JSON.parse(data);
    })
    this.getQuizModal.show();
    
  }
  ans=[]
  
  submit()
  {
    
    var i=0;
    for(var q of this.questions)
    {
      if(q.ans==this.ans[i])
        this.marks=this.marks+1;
      i=i+1;
    }
    
    this.resultModal.show();

  }

  logout()
  {
    this.studentLoginService.logout();
    // this.isLogout.emit()
    this._router.navigate(['../']);
  }
  code:any;
  getSubjects()
  {
    this.createquizService.getSubjectsClasswise(this._class).subscribe(data=>{
      this.currentQuiz=data
       
      if(data==null)
      {
        alert('No quiz avaialable')
      }
      else
      {
        for(var i of Object.keys(data))
        this.subjects.push(i)
       
      }
       
    })
  }

  postCurrentQuiz()
  {
    localStorage.setItem("subject", this.quizSubject);
    this.code=this.examCode.nativeElement.value
    this.createquizService.postCurrentQuiz(this.currentQuiz[this.quizSubject][this.examType][this.code]).subscribe(
      (response)=>console.log(response),
      (err)=>alert('No quiz exist'),
      ()=>this.call()
    )

  }
  call()
  {
    this._router.navigate(['/giveQuiz'])
  }
  postMarks(id)
  {
    this.createquizService.getCurrentMarks().subscribe(data=>{
      if(data!=null)
      {
        this.marks=data['marks']
        var outOf=data['totalMarks']
        this.subject=localStorage.getItem("subject")
      
        this.createquizService.postMarks(id,this.marks,'_'+this._class,this.subject,this.student_name,outOf).subscribe(
          (response)=>console.log(response),
          (err)=>console.log(err)
        )
      }
      
      
    })
    
    
  }
  ngOnInit(): void {
    var user=localStorage.getItem('student')
    this.studentLoginService.getUserData(JSON.parse(user).uid).subscribe(data=>{
      this.student_name=data.name;
      this._class=data.class
      this.getSubjects()
      this.postMarks(JSON.parse(user).uid)
    })
  }

}
