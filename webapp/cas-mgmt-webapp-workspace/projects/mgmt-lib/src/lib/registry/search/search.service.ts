import {Injectable} from '@angular/core';
import {ServiceItem} from '@apereo/mgmt-lib/src/lib/model';
import {Service} from '@apereo/mgmt-lib/src/lib/ui';
import {Observable} from 'rxjs/internal/Observable';
import {tap} from 'rxjs/internal/operators/tap';

/**
 * Service for handling requests to the server for searches.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class SearchService extends Service {

  results: ServiceItem[];
  query: string;

  /**
   * Calls the server with the passed Lucene query string to do a full text search for services that match.
   *
   * @param query - Lucene query string
   */
  search(query: string): Observable<ServiceItem[]> {
    this.query = query;
    return this.post<ServiceItem[]>('api/search', query)
      .pipe(tap(r => this.results = r));
  }

}
