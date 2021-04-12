import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DashboardService} from '../core/dashboard-service';

/**
 * Resolver to retrieve CAS info before navigating to InfoComponent.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class InfoResolve implements Resolve<Map<string, string>> {

  constructor(private service: DashboardService) {
  }

  /**
   * Returns server info.
   *
   * @param route - route snapshot
   * @param state - router state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Map<string, string>> {
    return this.service.getInfo();
  }

}
