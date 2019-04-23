import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {SsoSessionsResponse} from '../domain/sessions';
import {SpinnerService} from 'mgmt-lib';
import {SsosessionsService} from './ssosessions-service';

@Injectable({
  providedIn: 'root'
})
export class SsoSessionsResolve implements Resolve<SsoSessionsResponse> {

  constructor(private service: SsosessionsService,
              private spinner: SpinnerService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<SsoSessionsResponse> | SsoSessionsResponse {
    this.spinner.start('Loading your Sessions');
    return this.service.getUserSessions()
      .pipe(
        finalize(() => this.spinner.stop())
      );
  }
}
