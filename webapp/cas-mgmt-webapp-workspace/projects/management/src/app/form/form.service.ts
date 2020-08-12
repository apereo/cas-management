/**
 * Created by tschmidt on 2/14/17.
 */
import {Injectable} from '@angular/core';
import {catchError, map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AbstractRegisteredService, OAuthRegisteredService, OidcRegisteredService, RegexRegisteredService, SamlRegisteredService, WSFederationRegisterdService} from 'domain-lib';
import {Service} from 'shared-lib';

@Injectable({
  providedIn: 'root'
})
export class FormService extends Service {

  controller = 'api/services/';

  getService(id: string): Observable<AbstractRegisteredService> {
    return this.get<AbstractRegisteredService>(this.controller + id, 'Loading service')
      .pipe(
        take(1),
        map(resp => {
          if (RegexRegisteredService.instanceOf(resp)) {
            return new RegexRegisteredService(resp);
          }
          if (OAuthRegisteredService.instanceOf(resp)) {
            return new OAuthRegisteredService(resp);
          }
          if (SamlRegisteredService.instanceOf(resp)) {
            return new SamlRegisteredService(resp);
          }
          if (OidcRegisteredService.instanceOf(resp)) {
            return new OidcRegisteredService(resp);
          }
          if (WSFederationRegisterdService.instanceOf(resp)) {
            return new WSFederationRegisterdService(resp);
          }
        }),
        catchError(e => this.handleError(e, this.dialog))
      );
  }

  saveService(service: AbstractRegisteredService): Observable<number> {
    return this.post(this.controller, service, 'Saving service')
      .pipe(
        catchError(e => this.handleError(e, this.dialog))
      );
  }

}
