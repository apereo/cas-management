import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {AbstractRegisteredService, Service} from 'mgmt-lib';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImportService extends Service {

  controller = 'api/services/';
  submissionFile: String;
  service: AbstractRegisteredService;

  import(file: String): Observable<AbstractRegisteredService> {
    return this.post<AbstractRegisteredService>(this.controller + 'import', file)
      .pipe(
        tap(resp => this.service = resp),
        catchError((e) => this.handleError(e, this.dialog))
      );
  }

  importSubmission(file: String): Observable<AbstractRegisteredService> {
    return this.post<AbstractRegisteredService>( 'api/submissions/import', file)
      .pipe(
        tap(resp => {
          this.submissionFile = file;
          this.service = resp;
        }),
        catchError((e) => this.handleError(e, this.dialog))
      );
  }

}
