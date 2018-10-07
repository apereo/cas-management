import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {Change} from '../../domain/change';
import {ControlsService} from '../controls/controls.service';
import {take} from 'rxjs/operators';

@Injectable()
export class LocalChangesResolver implements Resolve<Change[]> {

  constructor(private service: ControlsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Change[]> {
    return this.service.untracked().pipe(take(1));
  }
}
