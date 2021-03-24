import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Branch} from '@apereo/mgmt-lib/src/lib/model';
import {Observable} from 'rxjs/internal/Observable';
import {PullService} from './pull.service';
import {catchError, mergeMap, take} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Resolver to retrieve open pull requests before PullComponent is navigated to.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class PullResolver implements Resolve<Branch[]> {

  constructor(private service: PullService,
              private app: AppConfigService) {}

  /**
   * Calls server to retrieve open pull requests.
   *
   * @param route - route snapshot
   * @param state - router state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Branch[]> {
    return this.service.getBranches([true, false, false], 'Loading pull requests')
      .pipe(
        take(1),
        mergeMap(pulls => of(pulls)),
        catchError(() => {
          this.app.showSnackBar('Unable to load Pull Requests');
          return EMPTY;
        })
      );
  }
}

