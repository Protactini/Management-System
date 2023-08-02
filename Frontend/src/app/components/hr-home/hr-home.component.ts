import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {finalize, Observable} from "rxjs";
import {Person} from "../contact/contact.component";
import { VisaStatus } from '../employee/employee.component';
import { InfoService } from 'src/app/services/info-service';
import { VisaStatusService } from 'src/app/services/visa-status.service';
import { PersonService } from 'src/app/services/person.service';
import { EmployeeService } from 'src/app/services/employee.service';
import {StageUpdate} from "../../model/StageUpdate";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AddressService} from "../../services/address.service";
import {Address, AddressEdit} from "../address/address.component";
import {PassDataServiceService} from "../../services/pass-data-service.service";
import {HttpServiceService} from "../../services/http-service.service";
import {UploadfileService} from "../../services/uploadfile.service";


export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}


@Component({
  selector: 'app-hr-home',
  templateUrl: './hr-home.component.html',
  styleUrls: ['./hr-home.component.css']
})

export class HrHomeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'work', 'expiration', 'left', 'i983', 'action'];
  dataSource!: MatTableDataSource<Person>;
  urls!: string[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  profileUrl1!: Observable<string | null>;
  profileUrl!: Observable<string | null>;
  constructor(private router: Router, private infoService: InfoService, private visaStatusService: VisaStatusService, private personService: PersonService,
    private employeeService: EmployeeService, public dialog: MatDialog, private passDataService: PassDataServiceService, private httpService: HttpServiceService,
              private uploadFile: UploadfileService) {
    // Create 100 users
   // const users = Array.from({length: 5}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    //console.log(users);
    //this.dataSource = new MatTableDataSource(users);
    //console.log(this.dataSource);
    //this.getInfo();
  }
  person!: Person[];
  visaStatus!: VisaStatus[];
  dayLeft!: number[];
  getInfo() {
    this.personService.getPersons().subscribe(data =>  {
      //this.info = data;
      //this.dataSource = data;
      this.dataSource = new MatTableDataSource(data);

      //console.log(data)
      // for (let i = 0; i < data.length; i++) {
      //   // @ts-ignore
      //   this.urls.push(this.getUrl(data[i].id));
      // }
    });

    this.visaStatusService.getVisaStatuses().subscribe(data => {
      this.visaStatus = data;
      this.dayLeft = [];
      for (let i = 0; i < data.length; i++) {
        // @ts-ignore
        const today = new Date();
        const date = new Date(data[i].visaEndDate);
        var diff = Math.trunc((date.getTime() - today.getTime()) / (1000 * 60 * 60* 24));
        this.dayLeft.push(diff);
      }
    });

    this.personService.getPersons().subscribe(data => {
      this.person = data;
    })
  }


  ngOnInit(): void {
      this.getInfo();
    // @ts-ignore
    console.log(this.dataSource[1]+'dsfngiownignwirnhioernihn');

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // @ts-ignore
    this.person.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onUpload(id:number) {
    window.alert("Upload successfully!")
  }

  openDialog(id: number): void {
   this.passDataService.setIndex(id);
    const dialogRef = this.dialog.open(HrHomeUpload, {
      width: "500px",
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }

  update!: StageUpdate;
  selectedFiles!: FileList;
  all!: any;
  url!: String;
  onDownload(id:number) {
    this.httpService.getAllEmplyeeVisaData().subscribe(
      (data: any) => {
        console.log(data); // list of heroes from backend
        const arr = JSON.parse(data); // json string -> json array
        this.all = arr[id - 1];
        this.url = this.all.files.link;
        console.log(this.all);
        if(this.url) { // @ts-ignore
          window.open(this.url);
        } else {
          window.open("https://www.ice.gov/doclib/sevis/pdf/i983.pdf");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onClick() {
    console.log("hhh");
  }
}


@Component({
  selector: 'hr-home-upload',
  templateUrl: './hr-home-upload.html',
  styleUrls: ['./hr-home.component.css']
})
export class HrHomeUpload {

  constructor(
    public dialogRef: MatDialogRef<HrHomeUpload>,
    @Inject(MAT_DIALOG_DATA) public data: Address,
    public dialog: MatDialog, private router: Router) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }


}
