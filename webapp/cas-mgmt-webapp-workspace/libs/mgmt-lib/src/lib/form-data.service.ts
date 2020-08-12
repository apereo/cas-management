import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Service, SpinnerService} from 'shared-lib';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {FormData} from 'domain-lib';

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

  availableAttributes(repos: string[]): string[] {
    const attrs = [];
    for (const key of Object.keys(this.options.availableAttributes)) {
      if (key === 'authentication' || (repos && repos.indexOf(key) > -1)) {
        const attr = this.options.availableAttributes[key];
        for (const at of attr) {
          if (attrs.indexOf(at) < 0) {
            attrs.push(at);
          }
        }
      }
    }
    return attrs;
  }
}
