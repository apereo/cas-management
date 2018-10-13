import {Injectable} from '@angular/core';
import {Service} from '../service';
import {ServiceItem} from '../../domain/service-item';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class SearchService extends Service {

  search(query: String): Observable<ServiceItem[]> {
    return this.get('search?query=' + query);
  }
}
