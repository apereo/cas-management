import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {SsoSessionResponse} from '../domain/sessions';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {DashboardService} from '../core/dashboard-service';

@Injectable({
  providedIn: 'root'
})
export class SsoSessionResolve implements Resolve<SsoSessionResponse> {

  constructor(private service: DashboardService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SsoSessionResponse> {
    return this.service.getSessions();
  }



}
