import {Injectable} from '@angular/core';
import {Service} from 'mgmt-lib';
import {Observable} from 'rxjs';
import {OAuthToken} from '../domain/sessions';

@Injectable({
  providedIn: 'root'
})
export class TokensService extends Service {

  getUserTokens(): Observable<OAuthToken[]> {
    return this.get<OAuthToken[]>('api/tokens');
  }

  revokeToken(id: string): Observable<void> {
    return this.delete('api/tokens/' + id);
  }

  bulkRevoke(tokens: string[]): Observable<void> {
    return this.post<void>('api/tokens/bulkRevoke', tokens);
  }

  revokeAll(): Observable<void> {
    return this.get<void>('api/tokens/revokeAll');
  }

}
