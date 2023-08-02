import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../services/http-service.service';
import { UploadfileService } from '../../services/uploadfile.service';
import { StageUpdate } from '../../model/StageUpdate';

@Component({
  selector: 'app-hr-visa-page',
  templateUrl: './hr-visa-page.component.html',
  styleUrls: ['./hr-visa-page.component.css'],
})
export class HrVisaPageComponent implements OnInit {
  allEmployee!: any;
  inputValue!: String;
  update!: StageUpdate;
  selectedFiles!: FileList;
  id = 2;

  constructor(
    private httpService: HttpServiceService,
    private uploadFile: UploadfileService
  ) {}

  ngOnInit(): void {
    this.inputValue = '';
    this.httpService.getAllEmplyeeVisaData().subscribe(
      (data: any) => {
        console.log(data); // list of heroes from backend
        const arr = JSON.parse(data); // json string -> json array
        this.allEmployee = arr;
        console.log(this.allEmployee);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  aproveEvent(index: number) {
    console.log(this.inputValue);
    this.update = new StageUpdate();
    this.update.id = this.allEmployee[index].id;
    this.update.num = 1;
    this.update.comment = this.inputValue as string;
    console.log(this.update);
    this.httpService.postEmployeeVisaData(this.update).subscribe();
    this.allEmployee[index].stageNum += 1;
  }

  rejectEvent(index: number) {
    console.log(this.inputValue);
    this.update = new StageUpdate();
    this.update.id = this.allEmployee[index].id;
    this.update.num = -1;
    this.update.comment = this.inputValue as string;
    console.log(this.update);
    this.httpService.postEmployeeVisaData(this.update).subscribe();
    this.allEmployee[index].stageNum += 1;
  }

  upload(index: number) {
    const file = this.selectedFiles.item(0);
    this.uploadFile.uploadFile(this.allEmployee[index].id, file, this.id);
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }
}
