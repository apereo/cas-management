import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {PendingItem} from '../domain/pending-item.model';
import {RegisterService} from '../core/register.servivce';

/**
 * Resolver that retrieves all pending submissions before navigating to the PendingComponent.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class PendingResolve implements Resolve<PendingItem[]> {

  constructor(private service: RegisterService) {}

  /**
   * Returns all the pending submissions for logged in user.
   *
   * @param route - route snapshot
   */
  resolve(route: ActivatedRouteSnapshot): Observable<PendingItem[]> {
    return this.service.getSubmissions();
  }
}
