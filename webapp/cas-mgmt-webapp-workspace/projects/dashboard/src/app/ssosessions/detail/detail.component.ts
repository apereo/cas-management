import {Component, Inject, OnInit} from '@angular/core';
import {AuthenticatedService, AuthenticationAttributes, SsoSession} from '../../domain/sessions.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

/**
 * Dialog component that displays a session detail.
 *
 * @author Travis Schmidt
 */

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  detail: SsoSession;
  serviceDisplayedColumns = ['id', 'originalUrl'];
  attrDisplayedColumns = ['id', 'value'];
  services: MatTableDataSource<AuthenticatedService>;

  attributes: MatTableDataSource<{id: string, value: string}>;


  constructor(public dialogRef: MatDialogRef<DetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: SsoSession) {
  }

  /**
   * Gets detail passed to the component and loads the view.
   */
  ngOnInit() {
    this.detail = this.data;

    const services = this.detail.authenticatedServices;

    const servicesData: AuthenticatedService[] = Object.keys(services).map((id) => ({
      ...services[id],
      id
    }));
    this.services = new MatTableDataSource(servicesData);

    const attributes = this.detail.authenticationAttributes;
    const attributesData: {id: string, value: string}[] = Object.keys(this.detail.authenticationAttributes).map((id) => ({
      value: attributes[id]?.join(','),
      id
    }));

    this.attributes = new MatTableDataSource(attributesData);
  }

}
