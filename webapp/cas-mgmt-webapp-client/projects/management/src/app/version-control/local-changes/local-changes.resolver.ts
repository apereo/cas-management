import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {Change} from 'mgmt-lib';
import {ControlsService} from '../../project-share/controls/controls.service';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalChangesResolver implements Resolve<Change[]> {

  constructor(private service: ControlsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Change[]> {
    return this.service.untracked().pipe(take(1));
  }
}
