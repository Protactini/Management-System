import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {Employee, VisaStatus} from "../employee/employee.component";
import {Person} from "../contact/contact.component";
import { EmployeeService } from 'src/app/services/employee.service';
import { PassDataServiceService } from 'src/app/services/pass-data-service.service';
import { VisaStatusService } from 'src/app/services/visa-status.service';
import { PersonService } from 'src/app/services/person.service';
import {SingleInfoService} from "../../services/single-info.service";
import {EmployeeInfo} from "../../domain/EmployeeInfo";

@Component({
  selector: 'app-hr-employee-profile',
  templateUrl: './hr-employee-profile.component.html',
  styleUrls: ['./hr-employee-profile.component.css']
})

export class HrEmployeeProfileComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'ssn', 'start', 'visa', 'detail'];
  dataSource!: MatTableDataSource<EmployeeInfo>;
  person!: Person[];
  visa!: VisaStatus[];
  all!: any[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private singleInfoService: SingleInfoService, private employeeService: EmployeeService, private personService: PersonService, private visaStatusService: VisaStatusService, private passDataService: PassDataServiceService) {
    //this.getInfo();
  }

  getInfo() {
    this.employeeService.getEmployees().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.personService.getPersons().subscribe(data => {
      this.person = data;
    });

    this.visaStatusService.getVisaStatuses().subscribe(data => {
      this.visa = data;
    });
  }

  getAllInfo() {
    this.singleInfoService.getAllEmployeeInfos().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  ngOnInit(): void {
    this.getAllInfo();
    //this.getInfo();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onClick(id: number) {
    this.passDataService.setIndex(id);
    this.router.navigate(['details'])
  }

}
