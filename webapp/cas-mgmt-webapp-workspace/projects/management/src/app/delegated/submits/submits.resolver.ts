import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Branch} from 'domain-lib';
import {SubmitService} from './submits.service';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SubmitsResolver implements Resolve<Branch[]> {

  constructor(private service: SubmitService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Branch[]> {
    return this.service.getSubmits("Loading submits");
  }
}
