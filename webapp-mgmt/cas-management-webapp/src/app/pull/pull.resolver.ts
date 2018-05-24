import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Branch} from '../../domain/branch';
import {Observable} from 'rxjs/internal/Observable';
import {ControlsService} from '../controls/controls.service';
import {PullService} from './pull.service';
import {take} from 'rxjs/operators';

@Injectable()
export class PullResolver implements Resolve<Branch[]> {

  constructor(private service: PullService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Branch[]> {
    return this.service.getBranches([true, false, false]).pipe(take(1));
  }
}

