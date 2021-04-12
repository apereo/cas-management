import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {SamlService} from '../saml/saml.service';
import {Metadata} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Resolver to retrieve metadata from the server before navigation to MetadataComponent.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class MetadataResolver implements Resolve<Metadata> {

  constructor(private samlService: SamlService) {}

  /**
   * Returns metadata for the routed service.
   *
   * @param route - route snapshot
   */
  resolve(route: ActivatedRouteSnapshot): Observable<Metadata> | Metadata {
    const param: string = route.params.id;

    if (!param) {
      return null;
    } else {
        return this.samlService.getMetadata(param);
    }
  }
}
