import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Address } from 'src/app/domain/Address';
import { Person } from 'src/app/domain/Person';
import { HRHireService } from 'src/app/services/hrhire.service';
import { OnboardService } from 'src/app/services/onboard.service';

@Component({
  selector: 'app-on-board-first-step',
  templateUrl: './on-board-first-step.component.html',
  styleUrls: ['./on-board-first-step.component.css']
})
export class OnBoardFirstStepComponent implements OnInit {
  email_readonly = false;
  person!: Person;
  address!: Address;
  @Input() userId!: number;
  @Output() next = new EventEmitter<number>();

  constructor(private onboardService: OnboardService, private hrHire: HRHireService) { }

  ngOnInit(): void {
    this.person = this.hrHire.allInfo.person;
    this.address = this.hrHire.allInfo.address;
  }
  
  submit(basic: NgForm) {

    this.person = {
      id: this.person.id || -1,
      firstName: basic.value['firstname'],
      middleName: basic.value['middlename'],
      lastName: basic.value['lastname'],
      email: basic.value['email'],
      cellPhone: basic.value['cellphone'],
      alternatePhone: basic.value['alternatephone'],
      dob: basic.value['dob'],
      gender: basic.value['gender'],
      ssn: basic.value['ssn'],
      userId: this.userId
    }

    
    this.address = {
      id: this.address.id || -1,
      addressLine1: basic.value['addline1'],
      addressLine2:  basic.value['addline2'],
      city: basic.value['city'],
      zipCode: basic.value['zip'],
      stateName: basic.value['state'],
      personId: -1
    };

    const obj = {
      person: this.person,
      address: this.address
    }

    this.onboardService.uploadSection1(obj).subscribe(res => {
      this.hrHire.allInfo.person.id = Number(res);
      this.next.emit(this.person.id);
    })
  }

}
