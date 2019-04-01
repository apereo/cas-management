import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {Service} from 'mgmt-lib';

@Injectable({
  providedIn: 'root'
})
export class OAuthService extends Service {

  controller = 'api/oauth';

  generateId(): Observable<string> {
    return this.getText(this.controller + '/generateId');
  }

  generateSecret(): Observable<string> {
    return this.getText(this.controller + '/generateSecret');
  }
}
