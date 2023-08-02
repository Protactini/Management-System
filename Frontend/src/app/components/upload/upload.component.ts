import {Component, Input, OnInit} from '@angular/core';
import {finalize, Observable} from "rxjs";
import {PassDataServiceService} from "../../services/pass-data-service.service";
import {StageUpdate} from "../../model/StageUpdate";
import {HttpServiceService} from "../../services/http-service.service";
import {UploadfileService} from "../../services/uploadfile.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})


export class UploadComponent implements OnInit {

  @Input() index!: number;

  constructor(private passDataService: PassDataServiceService, private httpService: HttpServiceService,
              private uploadFile: UploadfileService) {}

  ngOnInit(): void {
    this.index = this.passDataService.getIndex();
    if (!Number(this.index)) this.index = 1;
  }

  uploadPercent!: Observable<number>;

  uploadFiles(event: any) {
    const file = event.target.files[0];
    const filePath = `users/${this.index}/${file.name}`;
    //const ref = this.storage.ref(filePath);
    //const task = ref.put(file);


    // observe percentage changes
    // @ts-ignore
    this.uploadPercent = task.percentageChanges();

  }

  update!: StageUpdate;
  selectedFiles!: FileList;
  upload(event: any) {
    this.selectedFiles = event.target.files;
    const file = this.selectedFiles.item(0);
    this.uploadFile.uploadFile(this.index, file, this.index);
    this.update = new StageUpdate();
    this.update.id = this.index;
    this.update.num = 1;
    this.update.comment = '';
    console.log(this.update);
    this.httpService.postEmployeeVisaData(this.update).subscribe();
}
}
