import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {Service} from '../service';

/**
 * Service to handle request to the server by the footer.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class FooterService extends Service {

  /**
   * Calls the server to retrieve the currently deployed version.
   */
  getVersions(): Observable<string[]> {
    return this.get<string[]>('api/footer');
  }

}
