import { Component, Input, OnInit } from '@angular/core';
import { HttpServiceService } from '../../services/http-service.service';
import { UploadfileService } from '../../services/uploadfile.service';
import { StageUpdate } from '../../model/StageUpdate';

@Component({
  selector: 'app-employee-visa-page',
  templateUrl: './employee-visa-page.component.html',
  styleUrls: ['./employee-visa-page.component.css'],
})
export class EmployeeVisaPageComponent implements OnInit {
  visaInfor: any;
  update!: StageUpdate;
  dayLeft!: number;


  selectedFiles!: FileList;
  @Input() id!: number;

  constructor(
    private httpService: HttpServiceService,
    private uploadFile: UploadfileService
  ) {}

  ngOnInit() {
    if (!this.id) this.id = 1;
    this.httpService.getEmployeeVisaData(this.id).subscribe(
      (data: any) => {
        console.log(data); // list of heroes from backend
        const arr = JSON.parse(data); // json string -> json array
        this.visaInfor = arr;
        console.log(this.visaInfor);
        const today = new Date();
        const date = new Date(this.visaInfor.endDate);
        this.dayLeft = Math.trunc((date.getTime() - today.getTime()) / (1000 * 60 * 60* 24));
        if (!this.visaInfor) {
          this.visaInfor = {}
          this.visaInfor.stageNum = 0;
          this.dayLeft = 0;
        }
        console.log(this.dayLeft);
      },
      (error) => {
        console.log(error);
      }
    );



    // console.log(this.nameInfor);
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.uploadFile.uploadFile(this.id, file, this.id);

    this.update = new StageUpdate();
    this.update.id = this.id;
    this.update.num = this.id;
    this.update.comment = '';
    console.log(this.update);
    this.httpService.postEmployeeVisaData(this.update).subscribe();
    this.visaInfor.stageNum += 1;

    // window.location.reload();
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }
}
