import {Injectable} from '@angular/core';
import {Service} from './service';
import {DefaultRegisteredServiceContact, UserProfile} from 'domain-lib';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {MatDialog} from '@angular/material/dialog';
import {SpinnerService} from './spinner/spinner.service';

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

    getUser(): Observable<UserProfile> {
        return this.get<UserProfile>('api/user');
    }

    lookupContact(query: string): Observable<DefaultRegisteredServiceContact[]> {
        return this.get<DefaultRegisteredServiceContact[]>('api/contacts?query=' + query);
    }

    loggedInContact(): Observable<DefaultRegisteredServiceContact> {
      return this.get<DefaultRegisteredServiceContact>('api/contacts/loggedIn');
    }

}
