import {Component, Input, OnInit} from '@angular/core';
import {finalize, Observable} from "rxjs";
import {HttpServiceService} from "../../services/http-service.service";

@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.css']
})
export class UploadDetailsComponent implements OnInit {
  @Input() index!: number;
  employees!: any;

  constructor(private httpService: HttpServiceService) {}

  ngOnInit(): void {
    //if (!this.index) 
      this.index = 1;
    this.getFiles();
  }


  getFiles() {
    this.httpService.getAllEmplyeeVisaData().subscribe(
      (data: any) => {
        console.log(data); // list of heroes from backend
        const arr = JSON.parse(data); // json string -> json array
        console.log(JSON.stringify(arr));
        this.employees = arr;
        console.log(this.employees);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}

