import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {RegistryService} from '../registry.service';

/**
 * Resolver to retrieve yaml version of the service before navigating to the YamlComponent.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class YamlResolver implements Resolve<string> {

  constructor(private service: RegistryService) {}

  /**
   * Returns the service as a yaml string.
   *
   * @param route - route snapshot
   */
  resolve(route: ActivatedRouteSnapshot): Observable<string> | string {
    const history: boolean = route.data.history;
    const param: string = route.params.id;

    if (!param) {
      return '';
    } else {
        return this.service.getYaml(+param);
    }
  }
}
