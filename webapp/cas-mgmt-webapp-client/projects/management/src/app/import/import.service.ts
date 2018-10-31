import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {AbstractRegisteredService, Service} from 'mgmt-lib';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class ImportService extends Service {

  controller = '../services/';
  submissionFile: String;
  service: AbstractRegisteredService;

  import(file: String): Observable<AbstractRegisteredService> {
    return this.http.post<AbstractRegisteredService>(this.controller + 'import', file)
      .pipe(
        tap(resp => this.service = resp),
        catchError((e) => this.handleError(e, this.dialog))
      );
  }

  importSubmission(file: String): Observable<AbstractRegisteredService> {
    return this.http.post<AbstractRegisteredService>( 'submissions/import', file)
      .pipe(
        tap(resp => {
          this.submissionFile = file;
          this.service = resp;
        }),
        catchError((e) => this.handleError(e, this.dialog))
      );
  }

}
