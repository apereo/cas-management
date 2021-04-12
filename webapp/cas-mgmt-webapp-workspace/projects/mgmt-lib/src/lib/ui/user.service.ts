import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { MatDialog } from '@angular/material/dialog';
import {UserProfile, DefaultRegisteredServiceContact} from '@apereo/mgmt-lib/src/lib/model';
import {SpinnerService} from './spinner/spinner.service';
import {Service} from './service';

/**
 * Service for handling request related to the logged in user.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class UserService extends Service {

  user: UserProfile;

  constructor(protected http: HttpClient,
              protected dialog: MatDialog,
              protected spinner: SpinnerService) {
      super(http, dialog, spinner);
      this.getUser().subscribe(resp => this.user = resp);
  }

  /**
   * Calls the server to return information about the logged in user.
   */
  getUser(): Observable<UserProfile> {
      return this.get<UserProfile>('api/user');
  }

  /**
   * Calles the server to do a partial name match on a user in LDAP.
   *
   * @param query - partial name to match
   */
  lookupContact(query: string): Observable<DefaultRegisteredServiceContact[]> {
      return this.get<DefaultRegisteredServiceContact[]>('api/contacts?query=' + query);
  }

  /**
   * Return the contact information for the logged in user.
   */
  loggedInContact(): Observable<DefaultRegisteredServiceContact> {
    return this.get<DefaultRegisteredServiceContact>('api/contacts/loggedIn');
  }

}
