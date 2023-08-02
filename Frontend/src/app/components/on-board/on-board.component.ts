import { Component, OnInit } from '@angular/core';
import { Persona } from 'aws-sdk/clients/kendra';
import { Address } from 'src/app/domain/Address';
import { Contact } from 'src/app/domain/Contact';
import { Employee } from 'src/app/domain/Employee';
import { EmployeeInfo } from 'src/app/domain/EmployeeInfo';
import { Person } from 'src/app/domain/Person';
import { TokenData } from 'src/app/domain/TokenData';
import { VisaStatus } from 'src/app/domain/VisaStatus';
import { HRHireService } from 'src/app/services/hrhire.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-on-board',
  templateUrl: './on-board.component.html',
  styleUrls: ['./on-board.component.css'],
  providers: [HRHireService],
})
export class OnBoardComponent implements OnInit {
  selectedIndex: number;
  allInfo!: EmployeeInfo;
  person!: Person;
  address!: Address;
  visa!: VisaStatus;
  employee!: Employee;
  contacts!: Contact[];
  tokenData!: TokenData;
  
  constructor(private hrHire: HRHireService, private loginService: LoginService) {
    this.selectedIndex = 0;
   }

  ngOnInit(): void {
    this.loginService.getTokenData().subscribe(token => {
      this.tokenData = JSON.parse(token);
      this.hrHire.getSingleInfo(this.tokenData.id).subscribe(res =>{
        this.hrHire.allInfo = res;
        this.allInfo = this.hrHire.allInfo;
        //this.person = this.allInfo.person;
        this.hrHire.allInfo.person.email = this.tokenData.email;
        //this.address = this.allInfo.address;
        //this.visa = this.allInfo.visaStatus;
        //this.employee = this.allInfo.employee;
        if (!this.hrHire.allInfo.employee.car) this.hrHire.allInfo.employee.car="null_null_null";
        //this.contacts = this.allInfo.contacts;
      });
    });
    
  }

  next() {
    console.log("First step person id before: " + this.person.id);
    this.selectedIndex++;
  }

}
