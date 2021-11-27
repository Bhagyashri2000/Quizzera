import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Question } from '../../question';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreatequizService {
  
  constructor(private firestore: AngularFirestore, private firebase: AngularFireDatabase,
    private httpClient: HttpClient) {

  }
  AddQue(questions: Question[], _class:string,subject:string,examType,code) {
    var url='https://create-quiz-73795-default-rtdb.firebaseio.com/'+_class+'/'+subject+'/'+examType+'/'+code+'.json'
    return this.httpClient.put(url, questions)
  }

  getQuiz():Observable<Question[]>
  {
    return this.httpClient.get<Question[]>('https://create-quiz-73795-default-rtdb.firebaseio.com/questions.json');
  }
  getSubjectsClasswise(_class):Observable<any>
  {
    return this.httpClient.get<any>('https://create-quiz-73795-default-rtdb.firebaseio.com/'+_class+'.json');
  }
  getFilteredQuiz(_class:string, subject:string):Observable<Question[]>
  {
    var url='https://create-quiz-73795-default-rtdb.firebaseio.com/'+_class+'/'+subject+'.json'
    return this.httpClient.get<Question[]>(url);
  }
  postCurrentQuiz(quiz)
  {
    var url='https://create-quiz-73795-default-rtdb.firebaseio.com/currentQuiz.json'
    return this.httpClient.put(url, quiz)
  }
  postCurrentMarks(id,marks,totalMarks)
  {
    var url='https://create-quiz-73795-default-rtdb.firebaseio.com/currentMarks.json'
    var data:any;
      data = Object.assign({}, {
        marks:marks,
        totalMarks:totalMarks
    });
    return this.httpClient.put(url, data)
  }
  getCurrentMarks():Observable<any>
  {
    return this.httpClient.get<any>('https://create-quiz-73795-default-rtdb.firebaseio.com/currentMarks.json');
  }
  delCurrentMarks():Observable<any>
  {
    return this.httpClient.delete('https://create-quiz-73795-default-rtdb.firebaseio.com/currentMarks.json')
  }
  getMarks(subj):Observable<any>
  {
    console.log(subj)
    return this.httpClient.get<any>('https://create-quiz-73795-default-rtdb.firebaseio.com/marks/'+subj+'.json');
  }
  postMarks(id,marks,_class,subj,name,outOf)
  {
    var url='https://create-quiz-73795-default-rtdb.firebaseio.com/marks/'+subj+'/'+_class+'/'+id+'.json'
    var data:any;
      data = Object.assign({}, {
        marks:marks,
        name:name,
        totalMarks:outOf
    });
    return this.httpClient.put(url, data)
  }
  

  getCurrentQuiz():Observable<Question[]>
  {
    return this.httpClient.get<Question[]>('https://create-quiz-73795-default-rtdb.firebaseio.com/currentQuiz.json');
  }
  

  
  
}
