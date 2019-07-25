import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DashboardService} from '../core/dashboard-service';

@Injectable({
  providedIn: 'root'
})
export class InfoResolve implements Resolve<Map<string, string>> {

  constructor(private service: DashboardService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Map<string, string>> {
    return this.service.getInfo();
  }

}
