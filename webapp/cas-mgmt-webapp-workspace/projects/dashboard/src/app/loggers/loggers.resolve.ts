import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Logger} from '../domain/logger';
import {DashboardService} from '../core/dashboard-service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggersResolve implements Resolve<Map<string,Map<string, Logger>>> {

  constructor(private service: DashboardService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Map<string,Map<string, Logger>>> | Map<string,Map<string, Logger>> {
    return this.service.getLoggers();
  }

}
