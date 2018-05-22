import {Injectable} from '@angular/core';
import {Service} from '../service';
import {ServiceItem} from '../../domain/service-item';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class SearchService extends Service {

  constructor(http: HttpClient) {
    super(http);
  }

  search(query: String): Observable<ServiceItem[]> {
    return this.get('search?query=' + query);
  }
}
