import { Injectable } from '@angular/core';
import { TaskRequest } from './interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CodeExecutionService {

  rootUrl: string = "http://localhost:8080";

  language: string;
  code: string;
  timeLimit: 3000;

  customInput: string;
  customOutput: string;
  customStatus: number = 0;
  customStatusText: string;
  customTimeExec: any;

  inputs: Array<string> = [];
  outputs: Array<string> = [];
  answers: Array<string> = [];
  status: Array<number> = [];
  statusText: Array<string> = [];
  timeExec: Array<any> = [];

  // code status 
  // 0 -> not evaluated 
  // 1 -> correct
  // 2 -> wrong
  // 3 -> Error

  constructor(private http: HttpClient) { }

  addNewTestCase(inp: string, ans: string) {
    this.inputs.push(inp);
    this.answers.push(ans);
    this.outputs.push("");
    this.status.push(0);
    this.timeExec.push(0);
  }

  customRun() {
    let inputArray: Array<string> = [];
    inputArray.push(this.customInput);
    let taskRequest:TaskRequest = {
      language: this.language,
      code: this.code,
      timeLimit: this.timeLimit,
      inputs: inputArray
    } 
    this.run(taskRequest);  
  }

  runAllTests() {
    let taskRequest:TaskRequest = {
      language: this.language,
      code: this.code,
      timeLimit: this.timeLimit,
      inputs: this.inputs
    } 
    this.run(taskRequest);
    
  }

  run(taskRequest: TaskRequest) {
    this.http.post(`${this.rootUrl}/run`, taskRequest).subscribe((res: any) => {
      console.log(res);
    })
  }

  validator(out:string, ans:string) {
    let outputArr: Array<string> = [];
    let ansArr: Array<string> = [];
    outputArr = out.split("\n");
    ansArr = ans.split("\n");
    if(ansArr.length != outputArr.length) {
      return false;
    } 
    else {
      for(let i=0; i<ansArr.length; i++) {
        if(ansArr[i] != outputArr[i]) {
          return false;
        }
      }
      return true;
    }
  }

  validateTests() {
    for(let i=0; i<this.inputs.length; i++) {

    }
  }
  
}
