import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EditorComponent} from 'shared-lib';
import {SamlAddService} from './saml-add-service';
import {SamlRegisteredService} from 'domain-lib';
import {MatTabGroup} from '@angular/material/tabs';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'lib-saml-add',
  templateUrl: './saml-add.component.html',
  styleUrls: ['./saml-add.component.css']
})
export class SamlAddComponent implements OnInit {

  private lookupEntity = new Subject<string>();

  foundEntities: string[];

  @ViewChild('editor', { static: false })
  editor: EditorComponent;

  @ViewChild('tabs', {static: true})
  tabs: MatTabGroup;

  entity = '';
  url = '';

  constructor(public dialogRef: MatDialogRef<SamlAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public service: SamlAddService,
              public snackbar: MatSnackBar) { }

  ngOnInit() {
    this.lookupEntity.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((query: string) => {
        if (query && query !== '' && query.length >= 3) {
          return this.service.lookupEntity(query);
        } else {
          return new Observable((observer) => observer.next([]));
        }
      })
    ).subscribe((resp: string[])  => this.foundEntities = resp);
  }

  resolve() {
    if (this.tabs.selectedIndex === 1) {
      this.paste();
    } else if (this.tabs.selectedIndex === 0) {
      this.getEntity();
    } else if (this.tabs.selectedIndex === 2) {
      this.downloadEntity();
    }
  }

  upload(evt: Event) {
    const input: HTMLInputElement = evt.currentTarget as HTMLInputElement;
    const reader = new FileReader();
    // tslint:disable-next-line:only-arrow-functions
    reader.onload = (function(fe: SamlAddComponent) {
      // tslint:disable-next-line:only-arrow-functions
      return function(e: Event) {
        fe.service.upload(reader.result as string).subscribe(service => {
          fe.service.uploaded = service;
          fe.dialogRef.close('upload');
        }, error => {
          fe.dialogRef.close();
          fe.snackbar.open('The SP you attempted to add is already registered.', 'Dismiss', {duration: 5000});
        });
      };
    })(this);
    reader.readAsText(input.files[0]);
  }

  paste() {
    this.service.upload(this.editor.getFile()).subscribe(service => {
      this.service.uploaded = service;
      this.dialogRef.close('upload');
    }, error => {
      this.dialogRef.close();
      this.snackbar.open('The SP you attempted to add is already registered.', 'Dismiss', {duration: 5000});
    });
  }

  doLookupEntity(val: string) {
    this.lookupEntity.next(val);
  }

  getEntity() {
    this.service.addEntity(this.entity).subscribe(service => {
      this.service.uploaded = service;
      this.dialogRef.close('upload');
    }, error => {
      this.dialogRef.close();
      this.snackbar.open('The SP you attempted to add is already registered.', 'Dismiss', {duration: 5000});
    });
  }

  downloadEntity() {
    this.service.downloadEntity(this.url).subscribe(service => {
      this.service.uploaded = service;
      this.dialogRef.close('upload');
    }, error => {
      this.dialogRef.close();
      this.snackbar.open('The SP you attempted to add is already registered.', 'Dismiss', {duration: 5000});
    });
  }

  createNew() {
    this.service.uploaded = new SamlRegisteredService();
    this.dialogRef.close('upload');
  }
}
