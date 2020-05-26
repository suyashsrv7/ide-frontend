import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  text: string = "";
  options: any = { maxLines: 1000, printMargin: false };

  hrs: number;
  mins: number;
  secs: number;
  counter: number;

  timer: any;
  
  constructor() { }

  ngOnInit(): void {
  }

  onChange(code) {
    console.log("new code", code);
  }



}
