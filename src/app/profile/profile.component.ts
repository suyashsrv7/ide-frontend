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

  defaultId: number;
  languages: Array<string> = [];
  selectedLang: string;
  themes: Array<string> = [];
  selectedTheme: string;
  fonts: Array<string> = [];
  selectedFont: string;
  defaultCode: string;

  repositoryCodes: Array<any> = [];
  sharedCodes: Array<any> = [];

  idx: number;
  dName: string;
  dSharingLink: string;
  dLang: string;
  dCode: string;
  dSharable: boolean;
  dType: number;



  user: User;

  password:string;
  cnfrmPass: string;


  // messages
  changeInUserDefaults: string;
  changeInPassword: string;
  changeInFileUpload: string;

  constructor(private userDetails: UserdetailsService) { }

  ngOnInit(): void {
    this.languages = ["C", "C++", "Java", "Python 2.7", "Python 3.6"];
    this.themes = ["xcode", "eclipse", "twilight", "idle-fingers", "monokai"];
    this.fonts = ["14px", "16px", "18px"];
    this.getUserInfo();
  }

  demo() {
    console.log(this.dLang);
  }

  toggleCollapse() {
    this.collapsePassword = !this.collapsePassword;
  }

  toggleFileuploadCollapse() {
    this.collapseFileupload = !this.collapseFileupload;
  }

  validateFile() {
    let type = this.fileToUpload.type;
    console.log(type);
    if(type.split("/")[0] !== "image") return false;
    return true;
  }

  handleFileInput(files: FileList) {
    console.log("sdfsdf");
    this.toggleFileuploadCollapse();
    this.fileToUpload = files.item(0);
    if(!this.validateFile()) {
      this.changeInFileUpload = "Invalid file type";
      setTimeout(() => {
        this.changeInFileUpload = "";
        this.toggleFileuploadCollapse();
      }, 1000);
      return;
    }
    this.changeInFileUpload = "uploading...";
    this.userDetails.saveImage(this.fileToUpload);
    setTimeout(() => {
      this.toggleFileuploadCollapse();
    }, 1000);
    
    console.log(this.fileToUpload);
  }

  getUserInfo() {
    let data = this.userDetails.getUserInfo();
    console.log(data);
    this.defaultId = data.userDefaults.id;
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
    this.detectChangeinUserDefaults();
    this.selectedLang = this.languages[idx];
  }

  updateSelectedTheme(idx) {
    this.detectChangeinUserDefaults();
    this.selectedTheme = this.themes[idx];
  }

  updateSelectedFont(idx) {
    this.detectChangeinUserDefaults();  
    this.selectedFont = this.fonts[idx];
  }

  detectChangeinUserDefaults() {
    this.changeInUserDefaults = "changes have not been saved";
  }

  saveUserDefaults() {
    this.changeInUserDefaults = "";
    let data = {
      id: this.defaultId,
      default_code: this.defaultCode,
      font: this.selectedFont,
      language: this.selectedLang,
      theme: this.selectedTheme
    }

    this.userDetails.saveUserDefault(data);
  }

  displayCodeInfo(idx, isSharable) {
    this.idx = idx;
    if(isSharable) {
      this.dLang = this.sharedCodes[idx].language;
      this.dName = this.sharedCodes[idx].title;
      this.dCode = this.sharedCodes[idx].content;
      this.dSharingLink = this.sharedCodes[idx].id;
    } 
    else {
      this.dLang = this.repositoryCodes[idx].language;
      this.dName = this.repositoryCodes[idx].title;
      this.dCode = this.repositoryCodes[idx].content;
      this.dSharingLink = "";
    }

    this.dSharable = isSharable;
    this.dType = isSharable ? 0 : 1;
  }

  saveCode() {
    let data = {
      id: this.dSharingLink,
      content: this.dCode,
      title: this.dName,
      language: this.dLang,
      sharable: this.dSharable,
      type: this.dType
    }

    if(this.dType == 0) {
      this.sharedCodes[this.idx] = data;
    }
    else {
      this.repositoryCodes[this.idx] = data;
    }

    this.userDetails.saveUserCode(data);
  }

  changePassword() {
    console.log(this.password);
    if (!this.password || this.password?.length == 0) {
      this.changeInPassword = "Empty fields";
      return;
    }
    if (this.password != this.cnfrmPass) {
      this.changeInPassword = "Password did not match";
      return;
    }
    this.changeInPassword = "please wait...";
    this.userDetails.savePassword(this.password);
    this.changeInPassword = "success";
    setTimeout(() => {
      this.toggleCollapse();
    }, 1000);
  }

}
