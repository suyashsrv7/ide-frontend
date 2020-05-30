import { Injectable } from '@angular/core';
import { TaskRequest, Testcase } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodeExecutionService {

  rootUrl: string = "http://localhost:8080";

  language: string;
  code: string;
  timeLimit:any =  3000;

  customInput: string = "";
  customOutput: string;
  customStatus: number = 0;
  customStatusText: string;
  customTimeExec: any;

  customRunSubject = new Subject<any>();

  testCases: Array<Testcase> = [];

  // code status 
  // 0 -> not evaluated 
  // 1 -> correct
  // 2 -> wrong
  // 3 -> Error

  constructor(private http: HttpClient) { }

  addNewTestCase(inp: string, ans: string) {
    this.testCases.push({
      input: inp,
      output: "",
      status: 0,
      timeExec: 0,
      statusText: "Not evaluated",
      answer: ans
    });
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
    console.log(taskRequest);
    this.run(taskRequest).subscribe((res: any) => {
      // only one result
      console.log(res);
      let results = res.testResults[0];
      let dErrorFlag = results.error;
      let dContext = (results.error) ? results.errorContext : "Compiled Successfully" ;
      let dTime = results.execTime;
      let dOutput = (results.error) ? results.errorMsg : results.output;
      this.customRunSubject.next({
        dErrorFlag, dContext, dTime, dOutput
      })
    });  
    return this.customRunSubject.asObservable();
  }

  // runAllTests() {
  //   let taskRequest:TaskRequest = {
  //     language: this.language,
  //     code: this.code,
  //     timeLimit: this.timeLimit,
  //     inputs: this.inputs
  //   } 
  //   this.run(taskRequest).subscribe((res: any) => {
  //     // total number of testcases
  //   });
  // }

  run(taskRequest: TaskRequest) {
    return this.http.post(`${this.rootUrl}/run`, taskRequest)
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

  // validateTests() {
  //   for(let i=0; i<this.inputs.length; i++) {
  //     if(this.validator(this.outputs[i], this.answers[i])) {

  //     }
  //   }
  // }


  scrape(url) {
    return this.http.post("http://localhost:3000/fetch", {url})
  }
  
}
