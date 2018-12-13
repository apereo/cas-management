import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Commit, SpinnerService} from 'mgmt-lib';
import {RepoHistoryService} from './repo-history.service';
import {Observable} from 'rxjs/internal/Observable';
import {finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RepoHistoryResolver implements Resolve<Commit[]> {

  constructor(private service: RepoHistoryService, private spinner: SpinnerService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Commit[]> {
    this.spinner.start('Loading history');
    return this.service.commitLogs().pipe(finalize(() => this.spinner.stop()));
  }
}
