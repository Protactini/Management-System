import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DialogData} from "../house/house.component";
import {Observable} from "rxjs";
import { InfoService } from 'src/app/services/info-service';
import { SingleInfoService } from 'src/app/services/single-info.service';
import { TokenData } from 'src/app/domain/TokenData';
import { EmployeeInfo } from 'src/app/domain/EmployeeInfo';
import { Person } from 'src/app/domain/Person';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  //info!: Info[];
  //profileUrl: Observable<string | null>;
  //profileUrl1: Observable<string | null>;
  //profileUrl2: Observable<string | null>;
  person!: Person;
  index!: number;
  token!: TokenData;
  employeeId! : number;
  employeeInfo!: EmployeeInfo;

  constructor(public dialog: MatDialog, private router: Router, private infoService: InfoService, private _formBuilder: FormBuilder, 
    private singleInfoService: SingleInfoService, private route: ActivatedRoute) {
    //const ref = this.storage.ref('/test/uploads/i983.pdf');
    //this.profileUrl = ref.getDownloadURL();

    //const ref1 = this.storage.ref('/test/uploads/i765.pdf');
    //this.profileUrl1 = ref1.getDownloadURL();

    //const ref2 = this.storage.ref('/test/I-20.pdf');
    //this.profileUrl2 = ref2.getDownloadURL();
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.token = JSON.parse(data['token']);
      this.index = this.token.id;
      this.getAllInfo();
    });

    //if (!Number(this.index)) this.index = 1;
    this.router.events.subscribe(value => {
      this.getInfo();
    });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }
  getAllInfo() {
    //this.ind = this.route.snapshot.paramMap.get("id");
    this.singleInfoService.getAllInfo(this.index).subscribe(data =>  {
      this.employeeInfo = data;
      this.person = this.employeeInfo.person;
      this.employeeId = this.employeeInfo.employee.id;
    });
  }

  getInfo() {
    this.infoService.getInfos().subscribe(data =>  {
      //this.info = data;
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(Example, {
      width: "500px",
      //data: {name: this.info[0].firstName + ' ' + this.info[0].middleName + ' ' + this.info[0].lastName, id: this.info[0].id,email: this.info[0].email, phone: this.info[0].cellPhone},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      console.log(result);
    });
  }


}


@Component({
  selector: 'example',
  templateUrl: './example.html',
  styleUrls: ['./home.component.css']
})
export class Example {
  constructor(
    public dialogRef: MatDialogRef<Example>,
    //@Inject(MAT_DIALOG_DATA) public data: Info,
    public dialog: MatDialog, private formBuilder: FormBuilder, private router: Router, private infoService: InfoService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();


  }
  //info!: Info[];
  uid !: Number;
  getInfo() {
    this.infoService.getInfos().subscribe(data =>  {
      //this.info = data;
      let uid = data[0].id;
    });
  }
  addForm!: FormGroup;
  ngOnInit(): void {
    this.router.events.subscribe(value => {
      this.getInfo();
    });

    this.addForm = this.formBuilder.group({
      //id: this.data.id,
      //name: this.data.firstName + ' ' + this.data.middleName + ' ' + this.data.lastName,
      //email: this.data.email,
      //phone: this.data.cellPhone
    });

  }



  onSubmit() {
  console.log(this.addForm.value);
    // @ts-ignore

    if (this.addForm.value != this.info)
    this.infoService.addInfo(this.addForm.value).subscribe(data => {
      this.router.navigate(['info']);
    });
    this.dialogRef.close();
  }
}



