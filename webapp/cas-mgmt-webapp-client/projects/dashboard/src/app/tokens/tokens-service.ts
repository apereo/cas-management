import {Injectable} from '@angular/core';
import {Service} from 'mgmt-lib';
import {Observable} from 'rxjs';
import {OAuthToken} from '../domain/sessions';

@Injectable({
  providedIn: 'root'
})
export class TokensService extends Service {

  getTokens(): Observable<OAuthToken[]> {
    return this.get<OAuthToken[]>('api/tokens');
  }

  revokeToken(id: string): Observable<void> {
    return this.delete('api/tokens/' + id);
  }

}
