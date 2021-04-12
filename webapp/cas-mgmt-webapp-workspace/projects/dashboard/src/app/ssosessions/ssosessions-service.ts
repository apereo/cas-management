import {Injectable} from '@angular/core';
import {Service} from '@apereo/mgmt-lib';
import {Observable} from 'rxjs';
import {SsoSessionsResponse} from '../domain/sessions.model';

/**
 * Service for handling requests to the server for sso sessions.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class SsosessionsService extends Service {

  /**
   * Calls the server to get all sso sessions in the CAS cluster for the passed user.
   *
   * @param user - user id
   */
  getSessions(user: string): Observable<SsoSessionsResponse> {
    return this.get<SsoSessionsResponse>('api/sessions/' + user);
  }

  /**
   * Calls the server to revoke the passed TGT for the passed user.
   *
   * @param tgt - ticket granting ticket id
   * @param user - user id
   */
  revokeSession(tgt: string, user: string): Observable<void> {
    return this.delete('api/sessions/' + tgt + '?user=' + user);
  }
}
