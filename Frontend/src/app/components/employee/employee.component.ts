import {Component, Inject, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import { EmployeeService } from 'src/app/services/employee.service';
import { VisaStatusService } from 'src/app/services/visa-status.service';
import { SingleInfoService } from 'src/app/services/single-info.service';


export interface Employee {
  id: number;
  personId: number;
  managerId: number;
  startDate: string;
  endDate: string;
  avartar: string;
  car: string;
  dl: string;
  dlExpirationDate: string;
  houseId: number;
  visaStatusId: number;
}

export interface VisaStatus {
  id: number;
  visaType: string;
  visaStartDate: string;
  visaEndDate: string;
}


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employee!: Employee;
  visaStatus!: VisaStatus;
  @Input() index!: number;
  constructor(private router: Router, private employeeService: EmployeeService, private visaStatusService: VisaStatusService, public dialog: MatDialog, private singleInfoService: SingleInfoService) { }

  getInfo() {
    this.employeeService.getEmployees().subscribe(data =>  {
      this.employee = data;
    });

    this.visaStatusService.getVisaStatuses().subscribe(data =>  {
      this.visaStatus = data;
    });
  }

  getAllInfo() {
    //this.ind = this.route.snapshot.paramMap.get("id");
    this.singleInfoService.getAllInfo(this.index).subscribe(data =>  {
      this.employee = data.employee;
      this.visaStatus = data.visaStatus;
      console.log("GET PERSON DATA++++++++++++++++++++++=");
    });
  }


  ngOnInit(): void {
    if (!Number(this.index)) this.index = 11;
    this.getAllInfo();

  }


  openDialog(): void {
    const dialogRef = this.dialog.open(EmployeeEdit, {
      width: "500px",
      data: {
        personId: this.employee.personId,
        id: this.employee.id,
        managerId: this.employee.managerId,
        startDate: this.employee.startDate,
        endDate: this.employee.endDate,
        avartar: this.employee.avartar,
        car: this.employee.car,
        dl: this.employee.dl,
        dlExpirationDate: this.employee.dlExpirationDate,
        houseId: this.employee.houseId,
        visaStatusId: this.employee.visaStatusId,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
}


@Component({
  selector: 'employee-edit',
  templateUrl: './employee-edit.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeEdit {
  constructor(
    public dialogRef: MatDialogRef<EmployeeEdit>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    public dialog: MatDialog, private formBuilder: FormBuilder, private router: Router, private employeeService: EmployeeService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addForm!: FormGroup;
  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      id: this.data.id,
      personId: this.data.personId,
      managerId: this.data.managerId,
      startDate: this.data.startDate,
      endDate: this.data.endDate,
      avartar: this.data.avartar,
      car: this.data.car,
      dl: this.data.dl,
      dlExpirationDate: this.data.dlExpirationDate,
      houseId: this.data.houseId,
      visaStatusId: this.data.visaStatusId,
    });
  }

  onSubmit() {
    console.log(this.addForm.value);
    // @ts-ignore
    if (this.addForm.value != this.info)
      this.employeeService.updateEmployee(this.addForm.value).subscribe(data => {
        this.router.navigate(['employee']);
      });
    this.dialogRef.close();
  }
}
