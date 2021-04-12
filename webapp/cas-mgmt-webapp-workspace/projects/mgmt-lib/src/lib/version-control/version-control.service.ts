import {Service} from '@apereo/mgmt-lib/src/lib/ui';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';

/**
 * Service for version control.
 */
@Injectable({
  providedIn: 'root'
})
export class VersionControlService extends Service {

  /**
   * Calls the server to delete the service from the registry.
   *
   * @param id - assigned service id
   */
  deleteService(id: number): Observable<void> {
    return this.delete('api/services/' + id);
  }

  /**
   * Call the server to revert the changes made to a service.
   *
   * @param fileName - file name in repository
   */
  revert(fileName: string): Observable<string> {
    return this.getText('api/history/revert/' + fileName);
  }
}
