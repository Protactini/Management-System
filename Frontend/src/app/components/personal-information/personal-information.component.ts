import {Component, Inject, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import { PersonService } from 'src/app/services/person.service';
import { SingleInfoService } from 'src/app/services/single-info.service';
import { TokenData } from 'src/app/domain/TokenData';


export interface Person {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  cellPhone: string;
  alternatePhone: string;
  dob: string;
  gender: string;
  ssn: string;
  userId: number;
}

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})

export class PersonalInformationComponent implements OnInit {
  person!: Person;
  @Input() index!: number;
  ind !: number;
  constructor(private router: Router, private personService: PersonService, public dialog: MatDialog, private _formBuilder: FormBuilder, private route: ActivatedRoute, private singleInfoService: SingleInfoService) { }

  getInfo() {
    this.personService.getPersons().subscribe(data =>  {
      this.person = data;
      console.log("GET PERSON DATA++++++++++++++++++++++=");

    });
  }

  getAllInfo() {
    //this.ind = this.route.snapshot.paramMap.get("id");
    this.singleInfoService.getAllInfo(this.index).subscribe(data =>  {
      this.person = data.person;
      console.log("GET PERSON DATA++++++++++++++++++++++=");
    });
  }

  ngOnInit(): void {
    this.ind = 2;
    if (!Number(this.index)) this.index = 11;
    this.getAllInfo();
    //this.ind = this.route.snapshot.paramMap.get("id");

  }

  openDialog(): void {
    // @ts-ignore
    // @ts-ignore
    const dialogRef = this.dialog.open(PersonalInformationEdit, {
      width: "500px",
      data: {
        firstName: this.person.firstName,
        id: this.person.id,
        middleName: this.person.middleName,
        lastName: this.person.lastName,
        dob: this.person.dob,
        gender: this.person.gender,
        ssn: this.person.ssn,
        email: this.person.email,
        cellPhone: this.person.cellPhone,
        alternatePhone: this.person.alternatePhone,
        userId: this.person.userId,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
}

@Component({
  selector: 'personal-information-edit',
  templateUrl: './personal-information-edit.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationEdit {
  constructor(
    public dialogRef: MatDialogRef<PersonalInformationEdit>,
    @Inject(MAT_DIALOG_DATA) public data: Person,
    public dialog: MatDialog, private formBuilder: FormBuilder, private router: Router, private personService: PersonService
  ) {}

  addForm!: FormGroup;

  onNoClick(): void {
    this.dialogRef.close();
  }

  
  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      id: this.data.id,
      firstName: this.data.firstName,
      middleName: this.data.middleName,
      lastName: this.data.lastName,
      dob: this.data.dob,
      gender: this.data.gender,
      ssn: this.data.ssn,
      cellPhone: this.data.cellPhone,
      alternatePhone: this.data.alternatePhone,
      email: this.data.email,
      userId: this.data.userId
    });
  }

  onSubmit() {
    console.log(this.addForm.value);
    // @ts-ignore
    if (this.addForm.value != this.person)
      this.personService.updatePerson(this.addForm.value).subscribe(data => {
        this.router.navigate(['employee']);
      });
    this.dialogRef.close();
  }
}
