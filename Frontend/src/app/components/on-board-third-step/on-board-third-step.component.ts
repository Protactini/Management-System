import { Component, Input, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/domain/Contact';
import { Person } from 'src/app/domain/Person';
import { HRHireService } from 'src/app/services/hrhire.service';
import { OnboardService } from 'src/app/services/onboard.service';

@Component({
  selector: 'app-on-board-third-step',
  templateUrl: './on-board-third-step.component.html',
  styleUrls: ['./on-board-third-step.component.css']
})
export class OnBoardThirdStepComponent implements OnInit {

  contact!: Contact[];
  person!: Person;

  productForm: FormGroup;

  constructor(private onboardService: OnboardService, private fb:FormBuilder, private hrHire: HRHireService) { 
    this.productForm = this.fb.group({
      name: 'econtacts',
      econtacts: this.fb.array([]) ,
    });
  }

  econtacts() : FormArray {
    return this.productForm.get("econtacts") as FormArray
  }

  newQuantity(): FormGroup {
    return this.fb.group({
      ename: '',
      ephone: '',
      eaddress: '',
      eemail: '',
      erelationship: ''
    })
  }

  addEContact() {
    this.econtacts().push(this.newQuantity());
  }
   
  removeEContact(i:number) {
    this.econtacts().removeAt(i);
  }

  ngOnInit(): void {
    this.person = this.hrHire.allInfo.person;
    this.contact = this.hrHire.allInfo.contacts;
    for (let i = 1; i < this.contact.length; i++) {
      this.econtacts().push(this.fb.group({
        ename: this.contact[i].name,
        ephone: this.contact[i].phone,
        eaddress: this.contact[i].address,
        eemail: this.contact[i].email,
        erelationship: this.contact[i].relationship,
      }));
    }
  }

  submit(form: NgForm) {
    alert()
    let tempC : Contact[] = [];
    let i = 1;
    tempC.push({
      id: -1,
      personId: this.hrHire.allInfo.person.id,
      name: form.value['rname'],
      email: form.value['remail'],
      relationship: form.value['rrelationship'],
      phone: form.value['rphone'],
      reference: true,
      emergency: false,
      landlord: false,
      address: form.value['raddress']
    });

    
    for (let c of this.econtacts().controls) {
      alert(form.value['ename']);
      tempC.push({
        id: -1,
        personId: this.hrHire.allInfo.person.id,
        name: form.value['ename'],
        email: form.value['eemail'],
        relationship: form.value['erelationship'],
        phone: form.value['ephone'],
        reference: false,
        emergency: true,
        landlord: false,
        address: form.value['eaddress']
      });   
    }

    this.contact = tempC;

    this.onboardService.uploadSection3(this.contact).subscribe(res => {
      if (res != "Error uploading section!") {
        window.location.href = "/onboard/done";
      }
    })
  }
}
