import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {Change, SpinnerService} from 'mgmt-lib';
import {ControlsService} from '@app/project-share';
import {finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalChangesResolver implements Resolve<Change[]> {

  constructor(private service: ControlsService, private spinner: SpinnerService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Change[]> {
    this.spinner.start('Loading local changes');
    return this.service.untracked().pipe(finalize(() => this.spinner.stop()));
  }
}
