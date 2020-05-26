import { Component, OnInit, ViewChildren, ElementRef, ViewChild } from '@angular/core';
import { CollapseComponent } from 'angular-bootstrap-md';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('wrapper') private wrapper:any;

  collapsed:boolean = false;
  constructor() { }
  ngOnInit(): void {
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.wrapper.scrollToBottom();
  }


}
