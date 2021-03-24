import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {SubmissionsService} from './submissions.service';
import {Observable} from 'rxjs/internal/Observable';
import {ServiceItem} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Resolver to retrieve all submissions from the server before navigating to SubmissionsComponent.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class SubmissionsResolve implements Resolve<ServiceItem[]> {

  constructor(private service: SubmissionsService) {}

  /**
   * Returns all submissions on the server.
   *
   * @param route - route snapshot
   */
  resolve(route: ActivatedRouteSnapshot): Observable<ServiceItem[]> {
    return this.service.getSubmissions();
  }
}
