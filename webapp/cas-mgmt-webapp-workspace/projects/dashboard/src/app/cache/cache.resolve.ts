import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DashboardService} from '../core/dashboard-service';
import {Cache} from '../domain/cache.model';

@Injectable({
  providedIn: 'root'
})
export class CacheResolve implements Resolve<Cache> {

  constructor(private service: DashboardService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cache> {
    return this.service.getCache();
  }

}
