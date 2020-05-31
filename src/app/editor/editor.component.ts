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
import { UserdetailsService } from '../userdetails.service';
import { UserCode } from '../interfaces';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  sharename: string = "";
  link: string = "";

  share: UserCode;

  
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

  sampleArray: Array<any> = [];

  includeCodes: Array<number> = [];

  
  constructor(private codeExec: CodeExecutionService, public userDetails: UserdetailsService) { }

  ngOnInit(): void {
    this.languages = ["C", "C++", "Java", "Python 2.7", "Python 3.6"];
    this.modes = ["c_cpp", "c_cpp", "java", "python", "python"];
    this.fonts = ["14px", "16px", "18px"];
    this.themes = ["xcode", "monokai", "twilight", "eclipse", "idle_fingers"];
    this.codeExec.language = this.selectedLang;
    this.userDetails.getUserInfo().subscribe((res: any) => {
      this.loadDefaults();
      this.handleJavaLanguage(); 
    });
    
  }


  initShare() {
    let tag = this.randomHash();
    this.sharename = tag;
    this.share = {
      title: tag,
      id: tag,
      content: this.text,
      type: 0,
      sharable: true,
      language: this.selectedLang
    }
   
    this.link = "http://localhost:4200/code/" + tag;
  }


  loadDefaults() {
    let userDefaults = this.userDetails.userDefaults;
    this.selectedLang = userDefaults.language;
    this.selectedFont = userDefaults.font;
    this.selectedTheme = userDefaults.theme;
    this.text = this.text + "\n" + userDefaults.defaultCode;
    this.changeLanguage();

    let arr = this.userDetails.repositoryCodes;
    arr.forEach((el, i) => {
      this.sampleArray.push({...el, isIncluded: false})
    })

    console.log(this.sampleArray);

  }

  handleJavaLanguage() {
    if(this.selectedLang == "Java") {
      this.text = "// please name your class as srcFile" + "\n" + this.text;
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
    // console.log("new code", code);
    localStorage.setItem("code", code);
    this.codeExec.code = code;

  }

 
  includeItem(item:number) {
    this.sampleArray[item].isIncluded = !this.sampleArray[item].isIncluded;
    console.log(this.sampleArray);
  }

  resolveRepoCodes(){
    this.sampleArray.forEach((e, i) => {
      if(e.isIncluded) {
        this.text = this.text + "\n" + this.sampleArray[i].content + "\n";
      }
    })
  }

  randomHash() {
    return Math.random().toString(36).substring(2, 15);
  }

  saveSharable() {
    this.share.title = this.sharename;
    console.log(this.share);
    this.userDetails.saveUserCode(this.share);
  }

  copyCode() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.text;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  resetCode() {
    this.text = "";
    localStorage.setItem("code", "");
  }

}
