import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {Change} from '@apereo/mgmt-lib/src/lib/model';
import {ControlsService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Resolver to retrieve the list of working changes before navigating to LocalChanges component.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class LocalChangesResolver implements Resolve<Change[]> {

  constructor(private service: ControlsService) {}

  /**
   * Returns list of working changes in the repository.
   *
   * @param route - route snapshot
   * @param state - route state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Change[]> {
    return this.service.untracked();
  }
}
