import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AddspServiceService} from './addsp.service.service';

@Component({
  selector: 'lib-addsp',
  templateUrl: './addsp.component.html',
  styleUrls: ['./addsp.component.css']
})
export class AddSPComponent implements OnInit {

  private lookupEntity = new Subject<string>();

  foundEntities: string[];

  constructor(public dialogRef: MatDialogRef<AddSPComponent>,
              public service: AddspServiceService,
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

  upload(evt: Event) {
    const input: HTMLInputElement = evt.currentTarget as HTMLInputElement;
    const reader = new FileReader();
    // tslint:disable-next-line:only-arrow-functions
    reader.onload = (function(fe: AddSPComponent) {
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

  doLookupEntity(val: string) {
    this.lookupEntity.next(val);
  }

  getEntity(id: string) {
    this.service.addEntity(id).subscribe(service => {
      this.service.uploaded = service;
      this.dialogRef.close('upload');
    }, error => {
      this.dialogRef.close();
      this.snackbar.open('The SP you attempted to add is already registered.', 'Dismiss', {duration: 5000});
    });
  }
}
