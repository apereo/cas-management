import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {History} from '@apereo/mgmt-lib/src/lib/model';
import {HistoryService} from './history.service';
import {Observable} from 'rxjs/internal/Observable';

/**
 * Resolver to retrieve history before navigating to HistoryComponent.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class HistoryResolve implements Resolve<History[]> {

  constructor(private service: HistoryService) {}

  /**
   * Returns a list of History for the routed file.
   *
   * @param route - route snapshot
   */
  resolve(route: ActivatedRouteSnapshot): Observable<History[]> | History[] {
    const param: string = route.params.fileName;
    if (param) {
      return this.service.history(param);
    }
    return [];
  }
}
