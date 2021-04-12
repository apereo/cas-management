import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DashboardService} from '../core/dashboard-service';
import {Cache} from '../domain/cache.model';

/**
 * Resolver to retrieve cache statistics before navigating to CacheComponent.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class CacheResolve implements Resolve<Cache> {

  constructor(private service: DashboardService) {
  }

  /**
   * Returns cache statistics for CAS servers.
   *
   * @param route - route snapshot
   * @param state - router state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cache> {
    return this.service.getCache();
  }

}
