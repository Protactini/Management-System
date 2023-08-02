import {Component, Inject, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import { PersonService } from 'src/app/services/person.service';
import { SingleInfoService } from 'src/app/services/single-info.service';



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
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  person!: Person;
  @Input() index!: number;
  constructor(private router: Router, private personService: PersonService, public dialog: MatDialog, private singleInfoService: SingleInfoService) { }

  getInfo() {
    this.personService.getPersons().subscribe(data =>  {
      this.person = data;
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
    if (!Number(this.index)) this.index = 11;
    this.getAllInfo();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ContactEdit, {
      width: "500px",
      data: {
        firstName: this.person.firstName,
        middleName: this.person.middleName,
        lastName: this.person.lastName,
        id: this.person.id,
        dob: this.person.dob,
        gender: this.person.gender,
        ssn: this.person.ssn,
        email: this.person.email,
        cellPhone: this.person.cellPhone,
        alternatePhone: this.person.alternatePhone,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }

}

@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.html',
  styleUrls: ['./contact.component.css']
})
export class ContactEdit {
  constructor(
    public dialogRef: MatDialogRef<ContactEdit>,
    @Inject(MAT_DIALOG_DATA) public data: Person,
    public dialog: MatDialog, private formBuilder: FormBuilder, private router: Router, private personService: PersonService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addForm!: FormGroup;
  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      id: this.data.id,
      fisrtName: this.data.firstName,
      middleName: this.data.middleName,
      lastName: this.data.lastName,
      dob: this.data.dob,
      gender: this.data.gender,
      ssn: this.data.ssn,
      cellPhone: this.data.cellPhone,
      alternatePhone: this.data.alternatePhone,
      email: this.data.email
    });
  }

  onSubmit() {
    console.log(this.addForm.value);
    // @ts-ignore
    if (this.addForm.value != this.info)
      this.personService.updatePerson(this.addForm.value).subscribe(data => {
        this.router.navigate(['employee']);
      });
    this.dialogRef.close();
  }
}
