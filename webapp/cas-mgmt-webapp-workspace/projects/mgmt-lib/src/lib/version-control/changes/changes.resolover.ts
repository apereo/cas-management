import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {DiffEntry} from '@apereo/mgmt-lib/src/lib/model';
import {ChangesService} from './changes.service';
import {Observable} from 'rxjs/internal/Observable';

/**
 * Resolver to retreive all changes in a branch before navigating to the ChangesComponent.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class ChangesResolve implements Resolve<DiffEntry[]> {

  constructor(private service: ChangesService) {}

  /**
   * Returns the changes for a branch.
   *
   * @param route - route snapshot
   */
  resolve(route: ActivatedRouteSnapshot): Observable<DiffEntry[]> | DiffEntry[] {
    const param: string = route.params.branch;
    if (param) {
      return this.service.getChanges(param);
    }
    return [];
  }
}
