import { Component, Input, OnInit } from '@angular/core';
import { UploadfileService } from '../../services/uploadfile.service';
import { HttpServiceService } from '../../services/http-service.service';
import { File } from '../../model/File';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.css'],
})
export class UploadPageComponent implements OnInit {
  constructor(private uploadFile: UploadfileService) {}
  selectedFiles!: FileList;
  @Input() id!: number;
  // public fileDao!: File;

  ngOnInit(): void {
    if (!this.id) {this.id = 1}
    // this.fileDao = new File();
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.uploadFile.uploadFile(this.id, file, this.id);
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  // onFileChange(files: any) {
  //   // for(let index = 0; index < files.length)
  //   this.uploadFile.uploadFile(this.id, files);
  // }
}
