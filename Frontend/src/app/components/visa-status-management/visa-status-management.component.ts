import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import { InfoService } from 'src/app/services/info-service';

@Component({
  selector: 'app-visa-status-management',
  templateUrl: './visa-status-management.component.html',
  styleUrls: ['./visa-status-management.component.css']
})
export class VisaStatusManagementComponent implements OnInit {
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  //profileUrl: Observable<string | null>;
  //profileUrl1: Observable<string | null>;
  //profileUrl2: Observable<string | null>;


  constructor( private router: Router, private infoService: InfoService, private _formBuilder: FormBuilder) {
    //const ref = this.storage.ref('/users/1/i983.pdf');
    //this.profileUrl = ref.getDownloadURL();

    //const ref1 = this.storage.ref('/users/1/i765.pdf');
    //this.profileUrl1 = ref1.getDownloadURL();

    //const ref2 = this.storage.ref('/users/1/i20.pdf');
    //this.profileUrl2 = ref2.getDownloadURL();
  }
  ngOnInit(): void {
    this.router.events.subscribe(value => {
    });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }
}
