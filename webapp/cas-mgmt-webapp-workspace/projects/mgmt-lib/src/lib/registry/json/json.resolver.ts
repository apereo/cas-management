import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {RegistryService} from '../registry.service';

/**
 * Resolver to retrieve the json for a service before navigation to JsonComponent.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class JSONResolver implements Resolve<string> {

  constructor(private service: RegistryService) {}

  /**
   * Returns the service in json form.
   *
   * @param route - route snapshot
   */
  resolve(route: ActivatedRouteSnapshot): Observable<string> | string {
    const history: boolean = route.data.history;
    const param: string = route.params.id;

    if (!param) {
      return '';
    } else {
      return this.service.getJson(+param);
    }
  }
}
