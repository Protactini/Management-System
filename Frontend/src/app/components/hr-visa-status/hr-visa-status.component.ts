import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Person } from '../personal-information/personal-information.component';
import { InfoService } from 'src/app/services/info-service';


export interface PeriodicElement {
  id: number;
  name: string;
  work: string;
  application: string;
  status: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1,
    name: 'Daniel',
    work: 'F1',
    application: 'OPT',
    status: 'Pending',
  },
  {
    id: 2,
    name: 'Dan',
    work: 'F1',
    application: 'OPT',
    status: 'Pending',
  },
  {
    id: 3,
    name: 'Tom',
    work: 'F1',
    application: 'OPT',
    status: 'Pending',
  },
  {
    id: 4,
    name: 'Day',
    work: 'F1',
    application: 'OPT',
    status: 'Pending',
  },
  {
    id: 5,
    name: 'Ddddl',
    work: 'F1',
    application: 'OPT',
    status: 'Pending',
  },

];

@Component({
  selector: 'app-hr-visa-status',
  templateUrl: './hr-visa-status.component.html',
  styleUrls: ['./hr-visa-status.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HrVisaStatusComponent implements OnInit {
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  //dataSource!: Info[];
  info!: Person[];
  profileUrl1!:string;
  profileUrl2!:string;
  profileUrl3!:string;
  profileUrl4!:string;
  profileUrl5!:string;
  profileUrl6!:string;


  constructor(private router: Router, private infoService: InfoService, private _formBuilder: FormBuilder) {
    // const ref1 = this.storage.ref('${index}');
    // this.profileUrl1 = ref1.getDownloadURL();

  }


  getInfo() {
    this.infoService.getInfos().subscribe(data =>  {
      this.info = data;
    });
  }

  ngOnInit(): void {
    this.getInfo();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['id', 'name', 'work', 'application', 'status'];
  expandedElement!: PeriodicElement;
}
