import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Address } from 'src/app/domain/Address';
import { Person } from 'src/app/domain/Person';

@Component({
  selector: 'app-hrhire-basic-info',
  templateUrl: './hrhire-basic-info.component.html',
  styleUrls: ['./hrhire-basic-info.component.css']
})
export class HRHireBasicInfoComponent implements OnInit {

  @Input() person!: Person;
  @Input() address!: Address;

  constructor() {}

  ngOnInit(): void {
  }

}
