import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { HttpServiceService } from './http-service.service';
import { File } from '../model/File';

@Injectable({
  providedIn: 'root',
})
export class UploadfileService {
  FOLDER = 'test/';

  public fileDao!: File;

  constructor(private httpService: HttpServiceService) {}

  uploadFile(num: number, file: any, updateBy: number) {
    this.fileDao = new File();
    const contentType = file.type;
    const bucket = new S3({
      accessKeyId: '',
      secretAccessKey: '',
      region: 'us-east-1',
    });
    const params = {
      Bucket: 'testemployeebucket',
      Key: this.FOLDER + file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType,
    };

    bucket.upload(params, (err: any, data: any) => {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log('Successfully uploaded file.', data);

      this.fileDao.id = num;
      this.fileDao.location = data.Location;
      this.fileDao.title = data.Key;
      this.fileDao.uploadBy = updateBy;

      console.log(this.fileDao);
      this.httpService.postFileData(this.fileDao).subscribe((data: any) => {
        console.log(data);
      });

      return true;
    });
    //for upload progress
    // bucket
    //   .upload(params)
    //   .on('httpUploadProgress', function (evt) {
    //     console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
    //   })
    //   .send(function (err: any, data: any) {
    //     if (err) {
    //       console.log('There was an error uploading your file: ', err);
    //       return false;
    //     }
    //     console.log('Successfully uploaded file.', data);
    //     return true;
    //   });
  }

  uploadAvartar(num: number, file: any, updateBy: number) {
    this.fileDao = new File();
    const contentType = file.type;
    const bucket = new S3({
      accessKeyId: 'AKIA6ER3RVU5LUSYV4U7',
      secretAccessKey: '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',
      region: 'us-east-1',
    });
    const params = {
      Bucket: 'testemployeebucket',
      Key: this.FOLDER + file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType,
    };

    bucket.upload(params, (err: any, data: any) => {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log('Successfully uploaded file.', data);

      this.fileDao.id = num;
      this.fileDao.location = data.Location;
      this.fileDao.title = data.Key;
      this.fileDao.uploadBy = updateBy;

      this.httpService.postAvartar(this.fileDao).subscribe((data: any) => {
        console.log(data);
      });

      return true;
    });
  }
}
