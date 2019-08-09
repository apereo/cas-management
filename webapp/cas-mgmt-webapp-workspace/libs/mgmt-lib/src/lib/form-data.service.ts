import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Service} from 'shared-lib';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import {FormData} from 'domain-lib';
import {SpinnerService} from 'shared-lib';

@Injectable({
  providedIn: 'root'
})
export class FormDataService extends Service {

  options: FormData;

  constructor(public http: HttpClient, public dialog: MatDialog, public spinner: SpinnerService) {
    super(http, dialog, spinner);
    this.formData().subscribe(val => this.options = val);
  }

  private formData(): Observable<FormData> {
    return this.get<FormData>('api/formData')
      .pipe(
        catchError(e => this.handleError(e, this.dialog))
      );
  }
}
