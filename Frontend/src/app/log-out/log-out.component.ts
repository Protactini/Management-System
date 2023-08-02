import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  constructor(private logService: LoginService) { }

  ngOnInit(): void {
    this.logService.logout().subscribe(res => window.location.href = "/login");
  }

}
