import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {SsoSessionResponse} from '../domain/sessions';
import {Observable} from 'rxjs';
import {SsoSessionService} from './ssosessions-service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SsoSessionResolve implements Resolve<SsoSessionResponse> {

  constructor(private service: SsoSessionService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SsoSessionResponse> {
    return this.service.getSessions();
  }



}
