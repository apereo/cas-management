import {Injectable} from '@angular/core';
import {Service} from './service';
import {UserProfile} from '../domain/user-profile';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService extends Service {

    user: UserProfile;

    constructor(protected http: HttpClient) {
        super(http);
        this.getUser().subscribe(resp => this.user = resp);
    }

    getUser(): Observable<UserProfile> {
        return this.get<UserProfile>('user');
    }
}
