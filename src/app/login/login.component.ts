import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";

  message: string = "";

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  validateInput() {
    if(this.username == "" || this.password == "") {
      this.message = "*Empty fields";
      return false;
    }
    return true;
  } 

  login() {
    this.message = ""
    if(!this.validateInput()) {
      return;
    } 

    let data = {
      username: this.username,
      password: this.password
    }

    this.auth.authenticate(data).subscribe((res:any) => {
      console.log(res);
      this.auth.storeTokens(res.token);
      this.router.navigate(['/home']);
    },
    err => {
      console.log(err);
      this.message = "Unauthorized";
    })
  }

}
