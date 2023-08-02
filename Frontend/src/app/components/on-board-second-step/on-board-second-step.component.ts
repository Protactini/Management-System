import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/domain/Employee';
import { Person } from 'src/app/domain/Person';
import { VisaStatus } from 'src/app/domain/VisaStatus';
import { HRHireService } from 'src/app/services/hrhire.service';
import { OnboardService } from 'src/app/services/onboard.service';
import { UploadfileService } from 'src/app/services/uploadfile.service';

@Component({
  selector: 'app-on-board-second-step',
  templateUrl: './on-board-second-step.component.html',
  styleUrls: ['./on-board-second-step.component.css']
})
export class OnBoardSecondStepComponent implements OnInit {
  employee!: Employee;
  visaStatus!: VisaStatus;
  person!: Person;
  @Output() next = new EventEmitter<void>();
  selectedDL!: File;
  selectedVisa!: File;
  selectedAvartar!: File;

  constructor(private onboardService: OnboardService, private hrHire: HRHireService, private uploadfileService: UploadfileService) { }

  ngOnInit(): void {
    this.employee = this.hrHire.allInfo.employee;
    this.visaStatus = this.hrHire.allInfo.visaStatus;
    this.person = this.hrHire.allInfo.person;
  }

  submit(work: NgForm) {
    console.log("Second step person id: " + this.person.id);
    this.employee = {
      id: this.employee.id || -1,
      personId: this.hrHire.allInfo.person.id,
      managerId: -1,
      startDate: work.value['startdate'],
      endDate: work.value['enddate'],
      avartar: '',
      car: work.value['maker'] + '_' + work.value['model'] + '_' + work.value['color'],
      dl: work.value['driverlicense'],
      dlExpirationDate: work.value['expdate'],
      houseId: -1,
      visaStatusId: -1
    }

    this.visaStatus = {
      id: this.visaStatus.id || -1,
      visaType: work.value['visatype'],
      visaStartDate: work.value['startdate'],
      visaEndDate: work.value['enddate']
    }

    const obj = {
      employee: this.employee,
      visaStatus: this.visaStatus
    }

    this.onboardService.uploadSection2(obj).subscribe(res => {
        this.next.emit();
    })
  }

  selectDL(event: any) {
    if (event.target)
      this.selectedDL = event.target.files.item(0);
  }

  selectVisa(event: any) {
    this.selectedVisa = event.target.files.item(0);
  }

  selectAvartar(event: any) {
    this.selectedAvartar = event.target.files.item(0);
  }

}
