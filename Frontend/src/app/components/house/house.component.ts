import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { InfoService } from 'src/app/services/info-service';

export interface DialogData {
  animal: String;
  name: String;
}

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {
  animal!: String;
  aaa!: String;

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private router: Router, private infoService: InfoService) { }



  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: "500px",
      data: {name: this.aaa, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      this.animal = result;
    });
  }

  addForm!: FormGroup;

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      name: [],
      email: [],
      phone: []
    });
  }

  onSubmit() {
    // @ts-ignore
    this.infoService.addInfo(this.addForm.value).subscribe(data => {
      this.router.navigate(['info']);
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    console.log("jdigiernh");
  }
}
