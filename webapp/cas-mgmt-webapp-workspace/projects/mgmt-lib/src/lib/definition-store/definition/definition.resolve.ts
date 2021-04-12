import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {DefaultAttributeDefinition, SamlIdPAttributeDefinition} from '@apereo/mgmt-lib/src/lib/model';
import {EMPTY, Observable, of} from 'rxjs';
import {DefinitionService} from '../definition.service';
import {Injectable} from '@angular/core';
import {catchError, map, mergeMap, take} from 'rxjs/operators';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Retrieves a DefaultAttributeDefinition before navigating to component.
 */
@Injectable({
  providedIn: 'root'
})
export class DefinitionResolve implements Resolve<DefaultAttributeDefinition> {

  constructor(private service: DefinitionService,
              private app: AppConfigService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  /**
   * Returns a DefaultAttributeDefinition for the routed id.
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DefaultAttributeDefinition> | DefaultAttributeDefinition {
    const key = route.paramMap.get('key');
    if (key === 'new') {
      return new DefaultAttributeDefinition();
    }
    if (key === 'saml') {
      return new SamlIdPAttributeDefinition();
    }
    return this.service.getAttribute(key)
      .pipe(
        take(1),
        mergeMap(defn => of(defn)),
        catchError(err => {
          this.router.navigate(['../'], {relativeTo: this.route})
            .then(() => this.app.showSnackBar('Definition "' + key + '" not found'));
          return EMPTY;
        })
      );
  }

}
