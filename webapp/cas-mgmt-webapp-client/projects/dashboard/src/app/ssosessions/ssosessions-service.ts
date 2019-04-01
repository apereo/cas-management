import {Injectable} from '@angular/core';
import {Service} from 'mgmt-lib';
import {Observable} from 'rxjs';
import {SsoSessionsResponse} from '../domain/sessions';

@Injectable({
  providedIn: 'root'
})
export class SsosessionsService extends Service {

  getSessions(user: string): Observable<SsoSessionsResponse> {
    return this.get<SsoSessionsResponse>('api/sessions/' + user);
  }

  revokeSession(tgt: string): Observable<void> {
    return this.delete('api/sessions/' + tgt);
  }
}
