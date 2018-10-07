/**
 * Created by tschmidt on 2/15/17.
 */
import {Injectable} from '@angular/core';
import {Service} from '../service';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class FooterService extends Service {

  getVersions(): Observable<String[]> {
    return this.get<String[]>('footer');
  }

}
