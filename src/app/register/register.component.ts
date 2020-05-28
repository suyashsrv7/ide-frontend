import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RegisterUser } from '../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class RegisterComponent implements OnInit {

  email: string = "";
  username: string = "";
  password: string = "";
  cnfrmPass: string = "";

  message: string = "";

  constructor(private auth: AuthService, private router: Router ) { }

  ngOnInit(): void {
  }

  validateInput() {
    if(this.email == "" || this.username == "" || this.password == "" || this.cnfrmPass == "") {
      this.message = "*Empty fields";
      return false;
    }
    if(this.password != this.cnfrmPass) {
      this.message = "*Passwords did not match";
      return false;
    }

    return true;
  }

  register() {
    this.message = "";
    if(!this.validateInput()) {
      return;
    }
    let data:RegisterUser = {
      username: this.username,
      password: this.password,
      email: this.email
    }
    this.auth.register(data).subscribe((res:any) => {
      console.log(res);
      if(!res.err) {
        this.message = "Registered Successfully";
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      }
      else {
        this.message = res.msg;
      }
    });
     
     
      
   
  }

 
}
