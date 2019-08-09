import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {
  AbstractRegisteredService,
  RegexRegisteredService,
  OAuthRegisteredService,
  OidcRegisteredService,
  SamlRegisteredService,
  WSFederationRegisterdService
} from 'domain-lib';
import {Service} from 'shared-lib';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImportService extends Service {

  controller = 'api/services/';
  submissionFile: string;
  service: AbstractRegisteredService;

  import(file: string): Observable<AbstractRegisteredService> {
    return this.post<AbstractRegisteredService>(this.controller + 'import', file, 'Loading file')
      .pipe(
        tap(resp => this.service = resp),
        catchError((e) => this.handleError(e, this.dialog))
      );
  }

  importSubmission(file: string): Observable<AbstractRegisteredService> {
    return this.post<AbstractRegisteredService>( 'api/submissions/import', file)
      .pipe(
        tap(resp => {
          this.submissionFile = file;
          if (RegexRegisteredService.instanceOf(resp))
            this.service = new RegexRegisteredService(resp);
          if (OAuthRegisteredService.instanceOf(resp))
            this.service = new OAuthRegisteredService(resp);
          if (SamlRegisteredService.instanceOf(resp))
            this.service = new SamlRegisteredService(resp);
          if (OidcRegisteredService.instanceOf(resp))
            this.service = new OidcRegisteredService(resp);
          if (WSFederationRegisterdService.instanceOf(resp)) {
            this.service = new WSFederationRegisterdService(resp);
          }
        }),
        catchError((e) => this.handleError(e, this.dialog))
      );
  }

}
