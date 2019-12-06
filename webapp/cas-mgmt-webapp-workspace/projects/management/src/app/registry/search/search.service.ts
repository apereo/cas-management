import {Injectable} from '@angular/core';
import {Service} from 'shared-lib';
import {ServiceItem} from 'domain-lib';
import {Observable} from 'rxjs/internal/Observable';
import {tap} from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class SearchService extends Service {

  results: ServiceItem[];
  query: string;

  search(query: string): Observable<ServiceItem[]> {
    this.query = query;
    return this.post<ServiceItem[]>('api/search', query)
      .pipe(tap(r => this.results = r));
  }

  getYaml(id: number): Observable<string> {
    return this.getText('api/services/yaml/' + id);
  }

  getJson(id: number): Observable<string> {
    return this.getText('api/services/json/' + id);
  }

  promote(id: number): Observable<void> {
    return this.get('api/services/promote/' + id);
  }

  demote(id: number): Observable<void> {
    return this.get('api/services/demote/' + id);
  }
}
