import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {Service} from './service';

/**
 * Service to handle request to the server for generating OAuth id and secrets.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class OAuthService extends Service {

  controller = 'api/oauth';

  /**
   * Calls server to get a new generate id.
   */
  generateId(): Observable<string> {
    return this.getText(this.controller + '/generateId');
  }

  /**
   * Calls server to get a new generated secret.
   */
  generateSecret(): Observable<string> {
    return this.getText(this.controller + '/generateSecret');
  }
}
