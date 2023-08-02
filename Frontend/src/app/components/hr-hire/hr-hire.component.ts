import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";
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
  selector: 'app-hr-hire',
  templateUrl: './hr-hire.component.html',
  styleUrls: ['./hr-hire.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HrHireComponent implements OnInit {
  //dataSource!: Info[];
  //info!: Info[];
  constructor(private router: Router, private infoService: InfoService) { }


  getInfo() {
    this.infoService.getInfos().subscribe(data =>  {
      //this.info = data;
    });
  }

  ngOnInit(): void {
    this.getInfo();
  }
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['id', 'name', 'work', 'application', 'status'];
  expandedElement!: PeriodicElement;
}
