import { Component, OnInit } from '@angular/core';
import { CodeExecutionService } from '../code-execution.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {

  text: string = "";
  options: any = { maxLines: 1000, printMargin: false, fontSize: "16px" }; 

  hostUrl:string = "http://localhost:4200/code/";
  title: string;
  notFound: boolean = false;
  author: string;
  language: string;
  sharableLink: string


  constructor(private codeExec: CodeExecutionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let url = this.route.snapshot.paramMap.get('id');
    console.log(url);
    this.codeExec.getCode(url).subscribe((res: any) => {
      console.log(res);
      this.author = res.author;
      this.language = res.language;
      this.sharableLink = `${this.hostUrl}${res.link}`;
      this.text = this.text + res.content;
      this.title = res.title;
    },
    
    err => {
      this.notFound = true;
    });
  }

  copyLink() {
    console.log(this.sharableLink);
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.sharableLink;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
