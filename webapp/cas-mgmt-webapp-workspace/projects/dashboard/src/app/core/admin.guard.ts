import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UserService} from '@apereo/mgmt-lib';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import { map } from 'rxjs/operators';

/**
 * Route guard to ensure a user has ROLE_ADMIN.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private user: UserService, private router: Router) {
  }

  /**
   * Return true if user has ROLE_ADMIN.
   *
   * @param route - route snapshot
   * @param state - router state
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
    /*if (this.user?.user?.administrator) {
      return true;
    }
    this.router.navigate().then();
    return false;*/
    return this.user.getUser().pipe(map(u => u.administrator ? true : this.router.parseUrl('unauthorized')));
  }

}
