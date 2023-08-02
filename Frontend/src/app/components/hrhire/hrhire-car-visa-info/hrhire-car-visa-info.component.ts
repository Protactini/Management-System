import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/domain/Employee';
import { VisaStatus } from 'src/app/domain/VisaStatus';

@Component({
  selector: 'app-hrhire-car-visa-info',
  templateUrl: './hrhire-car-visa-info.component.html',
  styleUrls: ['./hrhire-car-visa-info.component.css']
})
export class HRHireCarVisaInfoComponent implements OnInit {
  @Input() visa!: VisaStatus;
  @Input() employee!: Employee;

  constructor() { }

  ngOnInit(): void {
  }

}
