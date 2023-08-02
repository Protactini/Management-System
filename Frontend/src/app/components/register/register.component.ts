import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RegistrationToken } from 'src/app/domain/RegistrationToken';
import { User } from 'src/app/domain/User';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regToken: any;

  constructor(private route: ActivatedRoute, private registerService: RegisterService) { }

  ngOnInit(): void {
    console.log(
      'Activated route data in Component:::',
      this.route.data
    );
    this.route.data.subscribe(data => {
      this.regToken = JSON.parse(data['registrationToken']);
    });
  }

  submit(registration: NgForm) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token');
    const new_user = new User(-1, registration.value['username'], this.regToken.email, registration.value['password'], 
      (new Date(Date.now())).toUTCString());
    this.registerService.uploadUser(new_user).subscribe(res => {
      alert(res);
      window.location.href = "/login";
    })
  }

}
