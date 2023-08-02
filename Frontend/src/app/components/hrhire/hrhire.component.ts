import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import { NgForm } from '@angular/forms';
import { HRHireService } from 'src/app/services/hrhire.service';
import { Employee } from 'src/app/domain/Employee';
import { EmployeeInfo } from 'src/app/domain/EmployeeInfo';

export interface PeriodicElement {
  num: number;
  name: string;
  work: string;
  application: string;
  status: string;
}

@Component({
  selector: 'app-hrhire',
  templateUrl: './hrhire.component.html',
  styleUrls: ['./hrhire.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HRHireComponent implements OnInit {
  allInfo!: EmployeeInfo[];
  expandedInfo!: PeriodicElement;
  dataSource!: PeriodicElement[];
  columnsToDisplay = ['num', 'name', 'work', 'application', 'status'];

  constructor(private hrHire: HRHireService) { }

  ngOnInit(): void {
    this.hrHire.getAllInfo().subscribe(res =>{
      this.allInfo = res;
      this.dataSource = [];
      for (let i = 1; i <= this.allInfo.length; i++) {
        let info = this.allInfo[i-1];
        if (info.applicationWorkFlow) {
          this.dataSource.push({
            num: i,
            name: info.person.firstName + ' ' + info.person.middleName + ' ' + info.person.lastName,
            work: info.visaStatus.visaType,
            application: info.applicationWorkFlow.type,
            status: info.applicationWorkFlow.status
          });
        }
      }
    })
  }

  generate(basic: NgForm) {
    this.hrHire.generateToken(basic.value['email']).subscribe(res =>{
      alert(res);
    })
  }

  addComment(index: number, comment: string) {
    const updatedWorkFlow = this.allInfo[index].applicationWorkFlow;
    updatedWorkFlow.comment = comment;
  }

  approve(index: number) {
    const updatedWorkFlow = this.allInfo[index].applicationWorkFlow;
    updatedWorkFlow.status = "Approved";
    this.hrHire.approveApplication(updatedWorkFlow).subscribe(res =>{
      console.log(res);
    })
  }

  reject(index: number) {
    const updatedWorkFlow = this.allInfo[index].applicationWorkFlow;
    if (!updatedWorkFlow.comment || updatedWorkFlow.comment == '') {
      alert("Please add some feedback in the comment, before you start rejecting!")
    } else {
      updatedWorkFlow.status = "Rejected";
      this.hrHire.rejectApplication(updatedWorkFlow).subscribe(res =>{
        console.log(res);
      })
    }
  }
}
