/**
 * Created by tschmidt on 2/13/17.
 */
import {Injectable} from '@angular/core';
import {Service} from '../service';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class DomainService extends Service {

  getDomains(): Observable<String[]> {
    return this.get<String[]>('domainList');
  }

 }
