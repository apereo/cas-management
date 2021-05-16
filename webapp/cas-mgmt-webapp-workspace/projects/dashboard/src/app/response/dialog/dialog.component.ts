import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {DashboardService} from '../../core/dashboard-service';
import {DialogForm} from './dialog.form';

/**
 * Dialog component for user to enter credentials and select SAML SP.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  private lookupEntity = new Subject<string>();
  foundEntities: string[];
  entity = '';

  form = new DialogForm();

  constructor(private dialogRef: MatDialogRef<DialogComponent>,
              private service: DashboardService) { }

  /**
   * Sets up pipe to look up SAML SPs.
   */
  ngOnInit(): void {
    this.lookupEntity.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(q => this.query(q))
    ).subscribe((resp: string[])  => this.foundEntities = resp);
  }

  /**
   * Calls the server find matching SPs.
   *
   * @param query - text to match
   */
  private query(query: string): Observable<string[]> {
    if (query && query !== '' && query.length >= 3) {
      return this.service.lookupEntity(query);
    } else {
      return new Observable((observer) => observer.next([]));
    }
  }

  /**
   * Gets text from view and sends to subject.
   *
   * @param val - text to search
   */
  doLookupEntity(val: string): void {
    this.lookupEntity.next(val);
  }

  /**
   * Pulls values from view and closes dialog passing options back to calling component.
   */
  resolve(): void {
    const data = {
      username: this.form.username.value,
      password: this.form.password.value,
      entityId: this.form.entityId.value,
      encrypt: this.form.encrypt.value
    };
    this.dialogRef.close(data);
  }

}
