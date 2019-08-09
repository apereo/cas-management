import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit() {
  }

  resolve(uid: string, password: string, serviceId: string) {
    const data = {username: uid, password: password, service: serviceId};
    this.dialogRef.close(data);
  }

}
