import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/domain/User';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user?: User
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }
  submit(loginForm: NgForm) {

    // this.user = new User(-1, loginForm.value["username"], loginForm.value["password"]);
    const user = {
      userName: loginForm.value["username"],
      password: loginForm.value["password"]
    }

    this.loginService.login(user).subscribe(res => {
      if (res == "Login successfully!") {
        if (loginForm.value["ishr"]) {
          window.location.href = "/hr";
        } else {
          window.location.href = "/employee";
        }
      } else {
        alert(res);
      }
    })
  }
}
