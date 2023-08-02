import {Component, Inject, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Person} from "../contact/contact.component";
import { SingleInfoService } from 'src/app/services/single-info.service';
import { AddressService } from 'src/app/services/address.service';

export interface Address {
  id: number;
  personId: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  zipCode: string;
  stateName: string;
}

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  address!: Address;
  @Input() index!: number;
  constructor(private router: Router, private addressService: AddressService, public dialog: MatDialog, private singleInfoService: SingleInfoService) { }

  getInfo() {
    this.addressService.getAddresses().subscribe(data =>  {
      this.address = data;
    });
  }

  getAllInfo() {
    //this.ind = this.route.snapshot.paramMap.get("id");
    this.singleInfoService.getAllInfo(this.index).subscribe(data =>  {
      this.address = data.address;
      console.log("GET PERSON DATA++++++++++++++++++++++=");
    });
  }

  ngOnInit(): void {
    if (!Number(this.index)) this.index = 11;
    this.getAllInfo();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddressEdit, {
      width: "500px",
      data: {
        personId: this.address.personId,
        id: this.address.id,
        addressLine1: this.address.addressLine1,
        addressLine2: this.address.addressLine2,
        city: this.address.city,
        zipCode: this.address.zipCode,
        stateName: this.address.stateName,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }

}


@Component({
  selector: 'address-edit',
  templateUrl: './address-edit.html',
  styleUrls: ['./address.component.css']
})
export class AddressEdit {
  constructor(
    public dialogRef: MatDialogRef<AddressEdit>,
    @Inject(MAT_DIALOG_DATA) public data: Address,
    public dialog: MatDialog, private formBuilder: FormBuilder, private router: Router, private addressService: AddressService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addForm!: FormGroup;
  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      id: this.data.id,
      personId: this.data.personId,
      addressLine1: this.data.addressLine1,
      addressLine2: this.data.addressLine2,
      city: this.data.city,
      zipCode: this.data.zipCode,
      stateName: this.data.stateName,
    });
  }

  onSubmit() {
    console.log(this.addForm.value);
    // @ts-ignore
    if (this.addForm.value != this.info)
      this.addressService.updateAddress(this.addForm.value).subscribe(data => {
        this.router.navigate(['employee']);
      });
    this.dialogRef.close();
  }
}
