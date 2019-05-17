import {Injectable} from '@angular/core';
import {Service} from 'mgmt-lib';
import {Observable} from 'rxjs';
import {SsoSessionsResponse} from '../domain/sessions';

@Injectable({
  providedIn: 'root'
})
export class SsosessionsService extends Service {

  getUserSessions(): Observable<SsoSessionsResponse> {
    return this.get<SsoSessionsResponse>('api/sessions');
  }

  revokeSession(tgt: string, user: string): Observable<void> {
    return this.delete('api/sessions/' + tgt + '?user=' + user);
  }

  bulkRevoke(tgts: string[]): Observable<void> {
    return this.post<void>('api/sessions/bulkRevoke', tgts);
  }

  revokeAll(): Observable<void> {
    return this.get<void>('api/sessions/revokeAll');
  }
}
