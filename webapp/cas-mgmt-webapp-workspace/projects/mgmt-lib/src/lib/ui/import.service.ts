import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {
  AbstractRegisteredService,
  RegexRegisteredService,
  OAuthRegisteredService,
  OidcRegisteredService,
  SamlRegisteredService,
  WSFederationRegisterdService
} from '@apereo/mgmt-lib/src/lib/model';
import {catchError, tap} from 'rxjs/operators';
import {Service} from './service';

/**
 * Service to handle requests to the server for import functionality.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class ImportService extends Service {

  controller = 'api/services/';
  submissionFile: string;
  service: AbstractRegisteredService;

  /**
   * Posts the service file to the server to be validated and saved in the registry.
   *
   * @param file - service as json or yaml
   */
  import(file: string): Observable<AbstractRegisteredService> {
    return this.post<AbstractRegisteredService>(this.controller + 'import', file, 'Loading file')
      .pipe(
        tap(resp => this.service = resp),
        catchError((e) => this.handleError(e, this.dialog))
      );
  }

  /**
   * Posts a new service file to server to be a requested submission to admins.
   *
   * @param file - service as json or yaml
   */
  importSubmission(file: string): Observable<AbstractRegisteredService> {
    return this.post<AbstractRegisteredService>( 'api/submissions/import', file)
      .pipe(
        tap(resp => {
          this.submissionFile = file;
          if (RegexRegisteredService.instanceOf(resp)) {
            this.service = new RegexRegisteredService(resp);
          }
          if (OAuthRegisteredService.instanceOf(resp)) {
            this.service = new OAuthRegisteredService(resp);
          }
          if (SamlRegisteredService.instanceOf(resp)) {
            this.service = new SamlRegisteredService(resp);
          }
          if (OidcRegisteredService.instanceOf(resp)) {
            this.service = new OidcRegisteredService(resp);
          }
          if (WSFederationRegisterdService.instanceOf(resp)) {
            this.service = new WSFederationRegisterdService(resp);
          }
        }),
        catchError((e) => this.handleError(e, this.dialog))
      );
  }

}
