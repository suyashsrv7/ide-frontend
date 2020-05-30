import { Component, OnInit, ViewChildren, ElementRef, ViewChild } from '@angular/core';
import { CollapseComponent } from 'angular-bootstrap-md';
import { CodeExecutionService } from '../code-execution.service';
import { MathjaxComponent } from '../mathjax/mathjax.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('wrapper') private wrapper: any;
  @ViewChild(MathjaxComponent) childView: MathjaxComponent;
  mathContent = `Loading...`;
  fetching: string = "";
  fetched: boolean = false;
  reset: boolean = true;

  collapsed: boolean;

  dErrorFlag: boolean;
  dContext: string = "";
  dTime: any = "";
  dOutput: string = "";

  testViewCollapase: boolean = false;
  vInput: string;
  vOutput: string;
  vAnswer: string;
  vStatus: number;
  vStatusText: string;

  problemStatement: any;
  url: any;

  constructor(public codeExec: CodeExecutionService) { }
  ngOnInit(): void {
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.wrapper.scrollToBottom();
  }

  customRun() {
    console.log(this.codeExec.customInput);
    this.codeExec.customRun().subscribe((res: any) => {
      this.dErrorFlag = res.dErrorFlag;
      this.dContext = res.dContext;
      this.dTime = res.dTime;
      this.dOutput = res.dOutput

    })
  }

  fetchProblem() {
    this.reset = false;
    this.fetching = "Fetching...";
    this.codeExec.scrape(this.url).subscribe((res: any) => {
      console.log(res);
      if(res.error) {
        this.fetching = "Connection failure!";
        setTimeout(() => {
          this.reFetch();
        })
      } else {
        this.mathContent = res.problemStatement;
        this.resolveTestcases(res.sampleTests);
        this.fetching = "";
        this.fetched = true;
      }
     
    },
    err => {
      this.fetching = "Connection failure!";
      setTimeout(() => {
        this.reFetch();
      }, 2000);
      return;
    })
  }


  reFetch() {
    this.reset = true;
    this.fetched = false;
    this.fetching = ""; 
    this.mathContent = "Loading...";
    this.url = 0;
  }

  resolveTestcases(sampleTests) {
    console.log(sampleTests);
    for(let i=0; i<sampleTests.length; i++) {
      console.log(sampleTests[i]);
      this.codeExec.addNewTestCase(sampleTests[i].input, sampleTests[i].answer);
    }

    console.log(this.codeExec.testCases);
  }

  testView(idx) {
    this.testViewCollapase = true;
    let vTest = this.codeExec.testCases[idx];
    this.vInput = vTest.input;
    this.vOutput = vTest.output;
    this.vAnswer = vTest.answer;
    this.vStatus = vTest.status;
    this.vStatusText = vTest.statusText;
  }
}
