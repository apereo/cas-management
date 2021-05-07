import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardService} from '../core/dashboard-service';
import { MatDialog } from '@angular/material/dialog';
import {DialogComponent} from './dialog/dialog.component';
import {ControlsService} from '@apereo/mgmt-lib';
import {Subscription} from 'rxjs';

/**
 * Attribute model.
 */
export class Attribute {
  key: string;
  values: string[];

  constructor(key: string, values: string[]) {
    this.key = key;
    this.values = values;
  }
}

/**
 * Component to generate a SAML response for the verification of integration.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit, OnDestroy {

  response = '';

  subscription: Subscription;

  constructor(private service: DashboardService,
              private controls: ControlsService,
              private dialog: MatDialog) {
    this.controls.title = 'SAML Response';
    this.controls.icon = 'article';
  }

  /**
   * Starts the component by opening dialog.
   */
  ngOnInit(): void {
    this.resolve();
    this.controls.resetButtons();
    this.controls.showLookup = true;
    this.subscription = this.controls.lookup.subscribe( () => this.resolve() );
  }

  /**
   * Destroy subscription.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Opens dialog component to get user credentials and SAML SP entity id.
   */
  resolve(): void {
    this.dialog.open(DialogComponent, {
      width: '500px',
      position: {top: '100px'}
    }).afterClosed().subscribe(data => {
      if (data) {
        this.getResponse(data);
      }
    });
  }

  /**
   * Calls sever with options and displays generated response.
   *
   * @param data - options
   */
  private getResponse(data: any): void {
    this.response = '';
    this.service.getResponse(data).subscribe(resp => {
      this.response = resp;
    });
  }
}
