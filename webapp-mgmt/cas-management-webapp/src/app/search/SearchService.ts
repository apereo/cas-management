import {Injectable} from '@angular/core';
import {Service} from '../service';
import {ServiceItem} from '../../domain/service-item';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class SearchService extends Service {

  search(query: String): Observable<ServiceItem[]> {
    return this.post('search', query);
  }

  getYaml(id: number): Observable<String> {
    return this.getText('services/yaml/' + id);
  }

  getJson(id: number): Observable<String> {
    return this.getText('services/json/' + id);
  }
}
