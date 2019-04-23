import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {OAuthToken} from '../domain/sessions';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {SpinnerService} from 'mgmt-lib';
import {TokensService} from './tokens-service';

@Injectable({
  providedIn: 'root'
})
export class TokensResolve implements Resolve<OAuthToken[]> {

  constructor(private service: TokensService,
              private spinner: SpinnerService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<OAuthToken[]> | OAuthToken[] {
    this.spinner.start('Loading your Sessions');
    return this.service.getUserTokens()
      .pipe(
        finalize(() => this.spinner.stop())
      );
  }
}
