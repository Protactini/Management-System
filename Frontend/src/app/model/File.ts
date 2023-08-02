import { NumberList } from 'aws-sdk/clients/iot';

export class File {
  public id!: number;
  public location!: string;
  public title!: string;
  public uploadBy!: number;
}
