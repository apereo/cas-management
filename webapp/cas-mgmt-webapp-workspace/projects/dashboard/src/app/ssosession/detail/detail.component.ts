import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource} from '@angular/material';
import {AuthenticatedService, SsoSession} from '../../domain/sessions';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  detail: SsoSession;
  displayedColumns = ['id', 'url'];
  dataSource: MatTableDataSource<AuthenticatedService>;
  selectedItem: AuthenticatedService;

  constructor(public dialogRef: MatDialogRef<DetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: SsoSession) {
  }


  ngOnInit() {
    this.detail = this.data;
    const services: AuthenticatedService[] = [];
    const servIt = Object.values(this.detail.authenticatedServices);
    for (const st of Object.keys(this.detail.authenticatedServices)) {
      const serv = this.detail.authenticatedServices[st];
      serv['id'] = st;
      services.push(serv);
    }
    this.dataSource = new MatTableDataSource(services);
  }

}
