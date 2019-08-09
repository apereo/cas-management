import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Commit} from 'domain-lib';
import {RepoHistoryService} from './repo-history.service';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RepoHistoryResolver implements Resolve<Commit[]> {

  constructor(private service: RepoHistoryService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Commit[]> {
    return this.service.commitLogs();
  }
}
