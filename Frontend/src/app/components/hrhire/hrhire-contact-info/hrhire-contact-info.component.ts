import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/domain/Contact';

@Component({
  selector: 'app-hrhire-contact-info',
  templateUrl: './hrhire-contact-info.component.html',
  styleUrls: ['./hrhire-contact-info.component.css']
})
export class HRHireContactInfoComponent implements OnInit {
  @Input() contacts!: Contact[];
  
  constructor() { }

  ngOnInit(): void {
  }

}
