import { Component, OnInit } from '@angular/core';
import { UserdetailsService } from '../userdetails.service';
import { User } from '../interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  collapsePassword: boolean = false;
  collapseFileupload: boolean = false;
  fileToUpload: File = null;

  languages: Array<string> = [];
  selectedLang: string;
  themes: Array<string> = [];
  selectedTheme: string;
  fonts: Array<string> = [];
  selectedFont: string;
  defaultCode: string;

  repositoryCodes: Array<any> = [];
  sharedCodes: Array<any> = [];

  user: User;

  password:string;
  cnfrmPass: string;

  constructor(private userDetails: UserdetailsService) { }

  ngOnInit(): void {
    this.languages = ["C", "C++", "Java", "Python 2.7", "Python 3.6"];
    this.themes = ["xcode", "eclipse", "twilight", "idle-fingers", "monokai"];
    this.fonts = ["14px", "16px", "18px"];
    this.getUserInfo();
  }

  toggleCollapse() {
    this.collapsePassword = !this.collapsePassword;
  }

  toggleFileuploadCollapse() {
    this.collapseFileupload = !this.collapseFileupload;
  }

  handleFileInput(files: FileList) {
    console.log("sdfsdf");
    this.toggleFileuploadCollapse();
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
  }

  getUserInfo() {
    let data = this.userDetails.getUserInfo();
    console.log(data);
    this.selectedLang = data.userDefaults.language;
    this.selectedTheme = data.userDefaults.theme;
    this.selectedFont = data.userDefaults.font;
    this.defaultCode = data.userDefaults.default_code;
    this.repositoryCodes = data.repositoryCodes;
    this.sharedCodes = data.sharedCodes;
    this.user = data.user;
    console.log(this.repositoryCodes);

  }

  updateSelectedLang(idx) {
    this.selectedLang = this.languages[idx];
  }

  updateSelectedTheme(idx) {
    this.selectedTheme = this.themes[idx];
  }

  updateSelectedFont(idx) {
    this.selectedFont = this.fonts[idx];
  }

  savePassword() {
    if(this.password.length == 0 || this.password != this.cnfrmPass) {
      return false;
    }
  }

  saveUserDefaults() {
    
  }

}
