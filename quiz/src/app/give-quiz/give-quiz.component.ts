import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Question } from 'src/question';
import {CreatequizService} from '../services/createquiz.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-give-quiz',
  templateUrl: './give-quiz.component.html',
  styleUrls: ['./give-quiz.component.css']
})
export class GiveQuizComponent implements OnInit {

  constructor(public createquizService:CreatequizService, public _router:Router) { }
  @ViewChild('resultModal') resultModal : ModalDirective;

  questions:Question[]=[]
  currentQue=0;
  ans;
  onAnswerSelected=false;
  correct=0;
  totalMarks=0;
  outOf=0;
  incorrect=0;
  visited=[]
  skillTag=new Map()
  displayStyle = "none";
  wrongQues=[]
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
    this._router.navigate(['../studentAfterLogin'])
  }

  getCurreQuiz()
  {
    this.createquizService.getCurrentQuiz().subscribe(data=>{
      this.questions=data;
    })
  }
  previous()
  {
      if(this.currentQue>0)
        this.currentQue--;
      
  }
  next()
  {
    if(this.currentQue<this.questions.length-1)
      this.currentQue++;
  }

  fieldChange(values: any): void {

    
    this.ans=values.currentTarget.value;
    this.onAnswerSelected=true;   
    this.questions[this.currentQue].student_ans=this.ans; 
    if(this.currentQue<this.questions.length-1)
    {
      setTimeout(()=>{
        this.currentQue++;
        this.onAnswerSelected=false;
        const ele=document.querySelector('input[name="ans"]:checked') as HTMLInputElement
        ele.checked = false;
      },1000);
  
    }
    

  }
  submit()
  {
    this.correct=0;
    this.incorrect=0;
    for(var i of this.questions)
    {
      this.outOf=i.pos*this.questions.length
      var temp:number=0;
      if(this.skillTag.get(i.tag))
         temp=this.skillTag.get(i.tag);
      
      if(i.student_ans=="")
        continue;
      else if(i.student_ans==i.ans)
      {
        temp=Number(temp)+Number(i.pos);
        this.correct=this.correct+1
        
      }
      else
      {
        temp=Number(temp)-Number(i.neg);
        this.incorrect=this.incorrect+1
        var j='op'+i.ans
        this.wrongQues.push({
          que: i.que,
          ans: i[j],
        })
      
      }
      this.skillTag.set(i.tag,Number(temp));
    }
    this.totalMarks=((this.correct*this.questions[0].pos)-(this.incorrect*this.questions[0].neg))
    this.postMarks((this.correct*this.questions[0].pos)-(this.incorrect*this.questions[0].neg));
    this.openPopup();
  }
  postMarks(marks)
  {
    this.createquizService.postCurrentMarks(JSON.parse(localStorage.getItem('student')).uid,marks,this.outOf).subscribe(
      (response)=>console.log(response),
      (err)=>console.log(err),
    )

  }
  ngOnInit(): void {
    this.getCurreQuiz()
  }

}
