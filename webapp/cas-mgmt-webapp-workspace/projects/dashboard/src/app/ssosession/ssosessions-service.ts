import {Injectable} from '@angular/core';
import {Service} from 'shared-lib';
import {Observable} from 'rxjs';
import {SsoSessionResponse} from '../domain/sessions';

@Injectable({
  providedIn: 'root'
})
export class SsoSessionService extends Service {

  getSessions(): Observable<SsoSessionResponse> {
    return this.get<SsoSessionResponse>('api/sessions/');
  }

  revokeSession(tgt: string): Observable<void> {
    return this.delete('api/sessions/' + tgt);
  }
}
