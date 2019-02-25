import {Injectable} from '@angular/core';
import {Service} from './service';
import {UserProfile} from './domain/user-profile';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {MatDialog} from '@angular/material';
import {DefaultRegisteredServiceContact} from './domain/contact';

@Injectable({
  providedIn: 'root'
})
export class UserService extends Service {

    user: UserProfile;

    constructor(protected http: HttpClient,
                protected dialog: MatDialog) {
        super(http, dialog);
        this.getUser().subscribe(resp => this.user = resp);
    }

    getUser(): Observable<UserProfile> {
        return this.get<UserProfile>('api/user');
    }

    lookupContact(query: string): Observable<DefaultRegisteredServiceContact[]> {
        return this.get<DefaultRegisteredServiceContact[]>('api/contacts?query=' + query);
    }

}
