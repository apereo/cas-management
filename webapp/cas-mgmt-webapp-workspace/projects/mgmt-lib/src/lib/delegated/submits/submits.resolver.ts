import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Branch} from '@apereo/mgmt-lib/src/lib/model';
import {SubmitService} from './submits.service';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, mergeMap, take} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Resolver to retrieve Submits from the server before navigating to the component.
 */
@Injectable({
  providedIn: 'root'
})
export class SubmitsResolver implements Resolve<Branch[]> {

  constructor(private service: SubmitService,
              private app: AppConfigService) {}

  /**
   * Calls the server to retrieve all submits.
   *
   * @param route - route snapshot
   * @param state - route state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Branch[]> {
    return this.service.getSubmits('Loading submits')
      .pipe(
        take(1),
        mergeMap(submits => of(submits)),
        catchError(() => {
          this.app.showSnackBar('Unable to load Submits');
          return EMPTY;
        })
      );
  }
}
