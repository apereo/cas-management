/**
 * Created by tschmidt on 2/15/17.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {Service} from '../service';

@Injectable({
  providedIn: 'root'
})
export class FooterService extends Service {

  getVersions(): Observable<String[]> {
    return this.get<String[]>('/api/footer');
  }

}
