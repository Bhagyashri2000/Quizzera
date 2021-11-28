import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {ModalDirective} from 'angular-bootstrap-md';
import { Question } from 'src/question';
import {CreatequizService} from '../services/createquiz.service';
import { FormControl, FormGroup } from "@angular/forms";




@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {

  @ViewChild('addQuestionModal') addQuestionModal : ModalDirective;
  @ViewChild('form1') mytemplateForm : FormGroupDirective;
  @ViewChild('code') examCode: ElementRef;
  @ViewChild('pos_marks') pos_marks: ElementRef;
  @ViewChild('neg_marks') neg_marks: ElementRef;
  @ViewChild('otherSkill') otherSkill: ElementRef;

  
  que_no=1;
  quizForm: FormGroup;
  submitted = false;
  question:Question=new Question();
  quiz_quesions:Question[]=[]
  modalForm : FormGroup;
  class="";
  subject="";
  examType="";
  code:any;
  skill:any;
  other=false;
  
  ans: string;
  showSuccessmsg=false;
  constructor(public createquizService:CreatequizService,public fb: FormBuilder) {
    this.modalForm = fb.group({
      'op1': ['', Validators.required],
      'op2': ['', Validators.required],
      'op3': ['', Validators.required],
      'op4': ['', Validators.required],
    })
  }
  
  addQuestion(pos,neg){
    
		this.addQuestionModal.show();
	}
  
  changeEvent_class($event)
  {
    this.class=$event.target.value
  }
  changeEvent_subject($event)
  {
    this.subject=$event.target.value
  }
  changeEvent_type($event)
  {
    this.examType=$event.target.value
  }
  changeEvent_skill($event)
  {
    this.skill=$event.currentTarget.value;
    if(this.skill=='Other')
    this.other=true;
    else
    this.other=false
  }
  addAnotherQuestion(que,op1,op2,op3,op4){
    if(this.skill=='Other')
      this.skill=this.otherSkill.nativeElement.value;
    this.quiz_quesions.push({
      q_no:this.que_no,
      que:que.value,
      op1:op1.value,
      op2:op2.value,
      op3:op3.value,
      op4:op4.value,
      ans:this.ans,
      student_ans:'',
      pos:this.pos_marks.nativeElement.value,
      neg:this.neg_marks.nativeElement.value,
      tag:this.skill,
    })
    this.que_no=this.que_no+1
    this.showSuccessmsg=true;
    
    setTimeout(()=>this.showSuccessmsg=false,2000);
  }

  fieldsChange(values: any): void {
    this.ans=values.currentTarget.value;
  }
  reset()
  {
    this.quizForm.reset();
      this.quizForm.get('que').clearValidators();
      this.quizForm.get('que').updateValueAndValidity();
      this.quizForm.get('op1').clearValidators();
      this.quizForm.get('op1').updateValueAndValidity();
      this.quizForm.get('op2').clearValidators();
      this.quizForm.get('op2').updateValueAndValidity();
      this.quizForm.get('op3').clearValidators();
      this.quizForm.get('op3').updateValueAndValidity();
      this.quizForm.get('op4').clearValidators();
      this.quizForm.get('op4').updateValueAndValidity();
      this.quizForm.get('ans').clearValidators();
      this.quizForm.get('ans').updateValueAndValidity();
  }
  get f() { return this.quizForm.controls; }
  resetForm(){

    this.modalForm.reset()
  }
  onSubmit()
  {
    if(this.examType=='Practice')
    {
      this.code='Practice'
    }
    else
    {
      this.code=this.examCode.nativeElement.value;
    }
    this.createquizService.AddQue(this.quiz_quesions,this.class,this.subject,this.examType,this.code).subscribe(
      (response)=>console.log(response),
      (err)=>console.log(err),
      
    )
    alert('Quiz Posted Successfully')
    this.addQuestionModal.hide()
   
  }
  
  
  
  ngOnInit(): void {
    this.que_no=1;
    this.quizForm = this.fb.group({
      que: ['', Validators.required],
      op1: ['', Validators.required],
      op2: ['', Validators.required],

      op3: ['', Validators.required],

      op4: ['', Validators.required],
      ans: "", 
      
    });    
  }
  
  

}

