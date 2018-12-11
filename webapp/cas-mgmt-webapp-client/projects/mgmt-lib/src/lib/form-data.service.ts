import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Service} from './service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {FormData} from './domain/form-data';

@Injectable({
  providedIn: 'root'
})
export class FormDataService extends Service {

  options: FormData;

  constructor(public http: HttpClient, public dialog: MatDialog) {
    super(http, dialog);
    this.formData().subscribe(val => this.options = val);
  }

  private formData(): Observable<FormData> {
    return this.get<FormData>('api/formData')
      .pipe(
        catchError(e => this.handleError(e, this.dialog))
      );
  }
}
