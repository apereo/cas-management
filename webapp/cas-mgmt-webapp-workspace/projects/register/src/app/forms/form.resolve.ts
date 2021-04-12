import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {AbstractRegisteredService, RegexRegisteredService, ImportService, FormService} from '@apereo/mgmt-lib';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';

/**
 * Resolver that fetches a service to be passed to the component on navigation.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class FormResolve implements Resolve<AbstractRegisteredService> {

  constructor(private service: FormService,
              private importService: ImportService) {}

  /**
   * Calls the server to retrieve the service or creates a new service to pass to the component.
   *
   * @param route - route snapshot
   */
  resolve(route: ActivatedRouteSnapshot): Observable<AbstractRegisteredService> | AbstractRegisteredService {
    const param: string = route.params.id;

    if (route.data.import) {
      return this.importService.service;
    } else if (!param || param === '-1') {
      return new RegexRegisteredService();
    }
    return this.service.getService(param)
        .pipe(
          map(resp => {
            if (resp) {
              if (route.data.duplicate) {
                resp.id = -1;
                resp.evaluationOrder = -1;
              }
              return resp;
            } else {
              return null;
            }
          }),
        );
  }
}
