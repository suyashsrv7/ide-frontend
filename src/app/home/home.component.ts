import { Component, OnInit, ViewChildren, ElementRef, ViewChild } from '@angular/core';
import { CollapseComponent } from 'angular-bootstrap-md';
import { CodeExecutionService } from '../code-execution.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', './codeforces.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('wrapper') private wrapper: any;

  collapsed: boolean;

  dErrorFlag:boolean;
  dContext: string = "";
  dTime: any = "";
  dOutput: string = "";

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
    this.codeExec.scrape(this.url).subscribe((res:any) => {
      this.problemStatement = res.problemStatement
    })
  }

}
