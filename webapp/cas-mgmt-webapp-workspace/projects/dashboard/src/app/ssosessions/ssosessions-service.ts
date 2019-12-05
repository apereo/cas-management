import {Injectable} from '@angular/core';
import {Service} from 'shared-lib';
import {Observable} from 'rxjs';
import {SsoSessionsResponse} from '../domain/sessions';

@Injectable({
  providedIn: 'root'
})
export class SsosessionsService extends Service {

  getSessions(): Observable<SsoSessionsResponse> {
    return this.get<SsoSessionsResponse>('api/sessions', 'Loading sessions');
  }

  revokeSession(tgt: string): Observable<void> {
    return this.delete('api/sessions/' + tgt);
  }
}
