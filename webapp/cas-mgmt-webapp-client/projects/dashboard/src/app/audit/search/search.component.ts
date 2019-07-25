import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SearchComponent>) { }

  ngOnInit() {
  }

  search(period: string, principal: string, action: string, clientIP: string, resource: string) {
    const data = {period: period, principal: principal, actionPerformed: action, clientIpAddress: clientIP, resourceOperatedUpon: resource};
    this.dialogRef.close(data);
  }

}
