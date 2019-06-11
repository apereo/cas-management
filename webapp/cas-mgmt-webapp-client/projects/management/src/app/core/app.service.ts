import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {Service} from 'mgmt-lib';

@Injectable({
  providedIn: 'root'
})
export class AppService extends Service {

  controller = 'api';

  generateRandom(): Observable<string> {
    return this.getText(this.controller + '/generateRandom');
  }

}
