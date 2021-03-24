import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Logger} from '../domain/logger.model';
import {DashboardService} from '../core/dashboard-service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

/**
 * Resolver to retrieve loggers before navigating to LoggerComponent.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class LoggersResolve implements Resolve<Map<string, Map<string, Logger>>> {

  constructor(private service: DashboardService) {

  }

  /**
   * Returns all loggers in CAS servers.
   *
   * @param route - route snapshot
   * @param state - router state
   */
  // tslint:disable-next-line:max-line-length
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Map<string, Map<string, Logger>>> | Map<string, Map<string, Logger>> {
    return this.service.getLoggers();
  }

}
