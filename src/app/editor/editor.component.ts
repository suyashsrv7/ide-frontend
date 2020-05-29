import { Component, OnInit } from '@angular/core';
import 'brace/theme/monokai';
import 'brace/theme/twilight';
import 'brace/theme/eclipse';
import 'brace/theme/xcode';
import 'brace/theme/idle_fingers';
import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/mode/c_cpp';
import { CodeExecutionService } from '../code-execution.service';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  
  languages: Array<string> = [];
  modes: Array<string> = [];
  fonts: Array<string> = [];
  themes: Array<string> = [];

  selectedLang: string = "C++";
  selectedFont: string = "16px";
  selectedTheme: string = "twilight";
  selectedMode: string = "c_cpp";

  text: string = "";
  options: any = { maxLines: 1000, printMargin: false, fontSize: this.selectedFont }; 


  
  constructor(private codeExec: CodeExecutionService) { }

  ngOnInit(): void {
    this.languages = ["C", "C++", "Java", "Python 2.7", "Python 3.6"];
    this.modes = ["c_cpp", "c_cpp", "java", "python", "python"];
    this.fonts = ["14px", "16px", "18px"];
    this.themes = ["xcode", "monokai", "twilight", "eclipse", "idle_fingers"];
    this.codeExec.language = this.selectedLang;
    this.handleJavaLanguage();

  }

  handleJavaLanguage() {
    if(this.selectedLang == "Java") {
      this.text = "// please name your class as srcFile" + this.text;
    }
  }

  changeLanguage() {
    this.languages.forEach((value, index) => {
      if(value == this.selectedLang) {
        this.selectedMode = this.modes[index];
        console.log(this.selectedMode);
      }
    })

    this.codeExec.language = this.selectedLang;
    this.handleJavaLanguage();

  }

  onChange(code) {
    console.log("new code", code);
    this.codeExec.code = code;
  }



}
