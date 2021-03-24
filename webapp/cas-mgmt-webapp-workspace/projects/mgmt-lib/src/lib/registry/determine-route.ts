import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

/**
 * Route guard to determine if domains or services should be navigated to.
 */
@Injectable({
  providedIn: 'root'
})
export class DetermineRoute implements CanActivate {

  constructor(private config: AppConfigService,
              private router: Router) {
  }


  /**
   * Determines which screen to start with.
   *
   * @param route - the route
   * @param state - the state
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.config.getConfig().subscribe(c => {
      if (c.delegatedMgmt) {
        this.router.navigate(['registry/domains']).then();
      } else {
        this.router.navigate(['registry/services', 'default']).then();
      }
    });
    return true;
  }
}
