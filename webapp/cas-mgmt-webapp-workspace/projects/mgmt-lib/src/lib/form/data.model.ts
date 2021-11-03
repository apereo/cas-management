import {
  AbstractRegisteredService,
  OAuthRegisteredService, OidcRegisteredService,
  RegexRegisteredService,
  SamlRegisteredService, WSFederationRegisteredService
} from '@apereo/mgmt-lib/src/lib/model';
import {MgmtFormGroup} from './mgmt-form-group';
import {FormGroup} from '@angular/forms';
import {Injectable, EventEmitter} from '@angular/core';
import {Service} from '@apereo/mgmt-lib/src/lib/ui';
import {Observable} from 'rxjs';
import {catchError, map, take} from 'rxjs/operators';

/**
 * Service Form.
 */
export class ServiceForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  constructor(private service: AbstractRegisteredService) {
    super({});
  }

  /**
   * Returns all sub forms in this service.
   */
  tabs(): MgmtFormGroup<AbstractRegisteredService>[] {
    return Object.keys(this.controls).map(k => this.get(k)) as MgmtFormGroup<AbstractRegisteredService>[];
  }

  /**
   * Returns the tab with the passed key.
   *
   * @param k - tab key
   */
  tab(k: string): MgmtFormGroup<AbstractRegisteredService> {
    return this.get(k) as MgmtFormGroup<AbstractRegisteredService>;
  }

  /**
   * Maps the form to a service.
   */
  map() {
    this.tabs().forEach(t => t.map(this.service));
  }

  /**
   * Resets all tabs to inital values.
   */
  reset(): void {
    this.tabs().forEach(t => t.reset());
    this.markAsPristine();
    this.markAsUntouched();
  }
}

/**
 * Service to inject form to tabs.
 */
@Injectable({
  providedIn: 'root'
})
export class FormService extends Service {

  private service: AbstractRegisteredService;

  typeChange = new EventEmitter<void>();
  registeredService: AbstractRegisteredService;
  form: ServiceForm;

  controller = 'api/services/';

  /**
   * Calls the server to get the service for the passed id.
   *
   * @param id - service id
   */
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
          if (WSFederationRegisteredService.instanceOf(resp)) {
            return new WSFederationRegisteredService(resp);
          }
        }),
        catchError(e => this.handleError(e, this.dialog))
      );
  }

  /**
   * Sends teh passed service to the server to be persisted.
   *
   * @param service - AbstractRegisteredService to be saved
   */
  saveService(service: AbstractRegisteredService): Observable<number> {
    return this.post(this.controller, service, 'Saving service')
      .pipe(
        catchError(e => this.handleError(e, this.dialog))
      );
  }
}
