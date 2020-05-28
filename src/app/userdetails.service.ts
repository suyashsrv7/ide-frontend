import { Injectable } from '@angular/core';
import { UserDefault, UserCode, UserDetails, User } from './interfaces'
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserdetailsService {

  rootUrl: string = "http://localhost:8080";

  userDefaults: UserDefault;
  userCodes: Array<UserCode>;
  repositoryCodes: Array<UserCode> = [];
  sharedCodes: Array<UserCode> = [];
  user: User;

  userInfo: Subject<any> = new Subject<any>();
  constructor(private http: HttpClient) { }

  getUserInfo(): any {
    this.getUserDetails();
    return this.userInfo.asObservable();
  }

  // hitting api's
  saveUserDefault(updateUserDefaults: UserDefault) {
    this.userDefaults = updateUserDefaults;
    return this.http.post(`${this.rootUrl}/save-defaults`, updateUserDefaults).subscribe((res: any) => {
      console.log(res);
    })
  }

  saveUserCode(updateUserCode: UserCode) {
    console.log(updateUserCode);
    return this.http.post(`${this.rootUrl}/save-code`, updateUserCode).subscribe((res:any) => {
      console.log(res);
    });
  }

  savePassword(password: string) {
    let data = {
      password: password
    }
    return this.http.post(`${this.rootUrl}/change-password`, data);
    console.log(password);
  }

  saveImage(file: any) {
    console.log(file);
    const endpoint = `${this.rootUrl}/upload`;
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(endpoint, formData);
  }

  getUserDetails() {
    // stub
    // let userDetailsStub: UserDetails = {
    //   id: 1,
    //   email: "suyashsrv7@gmail.com",
    //   img_url: "",
    //   username: "suyashsrv7",
    //   userCodes: [
    //     { id: "quark-1", title: "sometitle1", content: "Life is qwesome", language: "C++", sharable: true, type: 0 },
    //     { id: "quark-2", title: "sometitle2", content: "You is qwesome", language: "Java", sharable: false, type: 1 },
    //     { id: "quark-3", title: "sometitle3", content: "I is qwesome", language: "Python 2.7", sharable: true, type: 0 },
    //     { id: "quark-4", title: "sometitle4", content: "Wife is qwesome", language: "C++", sharable: true, type: 0 },
    //     { id: "quark-5", title: "sometitle5", content: "Sw is qwesome", language: "C", sharable: false, type: 1 },
    //     { id: "quark-6", title: "sometitle6", content: "Kills is qwesome", language: "C++", sharable: true, type: 0 }
    //   ],
    //   userDefaults: {
    //     id: 1,
    //     default_code: "This is default code",
    //     font: "16px",
    //     language: "C++",
    //     theme: "twilight"
    //   }
    // }
    // this.user = {
    //   id: userDetailsStub.id,
    //   email: userDetailsStub.email,
    //   img_url: userDetailsStub.img_url,
    //   username: userDetailsStub.username
    // }
    // this.userDefaults = userDetailsStub.userDefaults;
    // this.userCodes = userDetailsStub.userCodes;
    // this.repositoryCodes = this.userCodes.filter(userCode => {
    //   return (userCode.type == 1);
    // });
    // this.sharedCodes = this.userCodes.filter(userCode => {
    //   return (userCode.type == 0);
    // });

    // console.log("sad");
    // return {
    //   user: this.user,
    //   userDefaults: this.userDefaults,
    //   repositoryCodes: this.repositoryCodes,
    //   sharedCodes: this.sharedCodes
    // };
    this.http.get(`${this.rootUrl}/get-user`).subscribe((res: any) => {
      console.log(res);
      this.userCodes = res.userCodes;
      this.repositoryCodes = this.userCodes.filter(userCode => {
        return (userCode.type == 1);
      });
      this.sharedCodes = this.userCodes.filter(userCode => {
        return (userCode.type == 0);
      });
      this.userInfo.next({
        user: {
          id: res.id,
          email: res.email,
          imgUrl: res.imgUrl,
          username: res.username
        },
        userDefaults: res.userDefault,
        repositoryCodes: this.repositoryCodes,
        sharedCodes: this.sharedCodes
      });
    });
  }
}
