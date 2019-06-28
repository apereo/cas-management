import {Injectable} from '@angular/core';
import {Service} from 'mgmt-lib';
import {Observable} from 'rxjs';
import {OAuthToken} from '../domain/sessions';

@Injectable({
  providedIn: 'root'
})
export class TokensService extends Service {

  getTokens(user: string): Observable<OAuthToken[]> {
    return this.get<OAuthToken[]>('api/tokens/' + user);
  }

  revokeToken(id: string): Observable<void> {
    return this.delete('api/tokens/' + id);
  }

}
