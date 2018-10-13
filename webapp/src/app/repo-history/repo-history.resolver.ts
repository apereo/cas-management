import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Commit} from '../../domain/commit';
import {RepoHistoryService} from './repo-history.service';
import {Observable} from 'rxjs/internal/Observable';
import {take} from 'rxjs/operators';

@Injectable()
export class RepoHistoryResolver implements Resolve<Commit[]> {

  constructor(private service: RepoHistoryService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Commit[]> {
    return this.service.commitLogs().pipe(take(1));
  }
}
