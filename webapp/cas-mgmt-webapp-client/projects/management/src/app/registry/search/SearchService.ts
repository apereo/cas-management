import {Injectable} from '@angular/core';
import {Service, ServiceItem} from 'mgmt-lib';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SearchService extends Service {

  search(query: string): Observable<ServiceItem[]> {
    return this.post('api/search', query);
  }

  getYaml(id: number): Observable<string> {
    return this.getText('api/services/yaml/' + id);
  }

  getJson(id: number): Observable<string> {
    return this.getText('api/services/json/' + id);
  }
}
