import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<SearchComponent>) { }

  ngOnInit() {
    this.form = new FormGroup({
      interval: new FormControl(""),
      principal: new FormControl(""),
      action: new FormControl(""),
      clientIP: new FormControl(""),
      resource: new FormControl("")
    });
  }

  search() {
    const data = {interval: this.form.get('interval').value,
                  principal: this.form.get('principal').value,
                  actionPerformed: this.form.get('action').value,
                  clientIpAddress: this.form.get('clientIP').value,
                  resourceOperatedUpon: this.form.get('resource').value};
    this.dialogRef.close(data);
  }

}
