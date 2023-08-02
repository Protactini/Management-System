import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css']
})
export class UploadListComponent implements OnInit {
  @Input() index!: number;
  profileUrl1!: Observable<string | null>;
  profileUrl2!: Observable<string | null>;
  profileUrl3!: Observable<string | null>;
  profileUrl4!: Observable<string | null>;
  profileUrl5!: Observable<string | null>;
  profileUrl6!: Observable<string | null>;
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    /*
    const ref1 = this.storage.ref(`/users/${this.index}/optreceipt.pdf`);
    this.profileUrl1 = ref1.getDownloadURL();

    const ref2 = this.storage.ref(`/users/${this.index}/optead.pdf`);
    this.profileUrl2 = ref2.getDownloadURL();

    const ref3 = this.storage.ref(`/users/${this.index}/i983.pdf`);
    this.profileUrl3 = ref3.getDownloadURL();

    const ref4 = this.storage.ref(`/users/${this.index}/i20.pdf`);
    this.profileUrl4 = ref4.getDownloadURL();

    const ref5 = this.storage.ref(`/users/${this.index}/stemoptreceipt.pdf`);
    this.profileUrl5 = ref5.getDownloadURL();

    const ref6 = this.storage.ref(`/users/${this.index}/stemoptead.pdf`);
    this.profileUrl6 = ref6.getDownloadURL();
    */

    console.log("index is --------------"+this.index);
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }
}
