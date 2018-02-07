import {Injectable} from '@angular/core';
import {Service} from './service';
import {UserProfile} from '../domain/user-profile';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService extends Service {

    user: UserProfile;

    constructor(protected http: HttpClient) {
        super(http);
        this.getUser();
    }

    getUser(): Promise<UserProfile> {
        return this.get<UserProfile>('user')
          .then(resp => this.user = resp);
    }
}
