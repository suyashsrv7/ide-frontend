import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email: string = "";
  message: string = "";

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  validateInput() {
    if(this.email == "") {
      return false;
    }

    return true;
  }

  requestPassword() {
    this.message = "";
    if(!this.validateInput()) {
      this.message = "*Empty fields";
      return;
    }
    this.message = "Sending mail...";
    this.auth.forgotPassword(this.email).subscribe((res: any) => {
      this.message = "Sent";
      setTimeout(()=> {
        this.router.navigate(['/login']);
      }, 1000);
    },
    err => {
      this.message = "Failed";
      console.log(err);
    });
  }

}
