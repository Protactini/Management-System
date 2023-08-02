import {Component, Inject, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Person} from "../contact/contact.component";
import { ContactService } from 'src/app/services/contact.service';
import { SingleInfoService } from 'src/app/services/single-info.service';


export interface Contact {
  id: number;
  personId: number;
  name: string;
  email: string;
  relationship: string;
  phone: string;
  isReference: number;
  isEmergency: number;
  isLandlord: number;
  address: string;
  firstName: string;
  middleName: string;
  lastName: string;
}

@Component({
  selector: 'app-emergency-contact',
  templateUrl: './emergency-contact.component.html',
  styleUrls: ['./emergency-contact.component.css']
})

export class EmergencyContactComponent implements OnInit {

  contact!: Contact;
  @Input() index!: number;
  constructor(private router: Router, private contactService: ContactService, public dialog: MatDialog, private singleInfoService: SingleInfoService) { }

  // getInfo() {
  //   this.contactService.getContacts().subscribe(data =>  {
  //     this.contact = data;
  //   });
  // }
contacts!: any[];
  getAllInfo() {
    //this.ind = this.route.snapshot.paramMap.get("id");
    this.singleInfoService.getAllInfo(this.index).subscribe(data =>  {
      this.contacts = data.contacts;
      this.contact = this.contacts[1];
      console.log("GET PERSON DATA++++++++++++++++++++++="+this.contacts[0]);
    });
  }

  ngOnInit(): void {
    if (!Number(this.index)) this.index = 11;
    this.getAllInfo();

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EmergencyContactEdit, {
      width: "500px",
      data: {
        id: this.contact.id,
        name: this.contact.name,
        personId: this.contact.personId,
        relationship: this.contact.relationship,
        isEmergency: this.contact.isEmergency,
        isReference: this.contact.isReference,
        email: this.contact.email,
        phone: this.contact.phone,
        isLandlord: this.contact.isLandlord,
        address: this.contact.address,
        firstName: this.contact.firstName,
        middleName: this.contact.middleName,
        lastName: this.contact.lastName,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }

}


@Component({
  selector: 'emergency-contact-edit',
  templateUrl: './emergency-contact-edit.html',
  styleUrls: ['./emergency-contact.component.css']
})
export class EmergencyContactEdit {
  constructor(
    public dialogRef: MatDialogRef<EmergencyContactEdit>,
    @Inject(MAT_DIALOG_DATA) public data: Contact,
    public dialog: MatDialog, private formBuilder: FormBuilder, private router: Router, private contactService: ContactService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addForm!: FormGroup;
  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      id: this.data.id,
      name: this.data.name,
      personId: this.data.personId,
      relationship: this.data.relationship,
      isEmergency: this.data.isEmergency,
      isReference: this.data.isReference,
      phone: this.data.phone,
      isLandlord: this.data.isLandlord,
      email: this.data.email,
      address: this.data.address,
      firstName: this.data.firstName,
      middleName: this.data.middleName,
      lastName: this.data.lastName,
    })
  }

  onSubmit() {
    console.log(this.addForm.value);
    // @ts-ignore
    if (this.addForm.value != this.info)
      this.contactService.updateContact(this.addForm.value).subscribe(data => {
        this.router.navigate(['employee']);
      });
    this.dialogRef.close();
  }
}
