import {Injectable} from '@angular/core';
import {Service} from './service';
import {UserProfile} from '../domain/user-profile';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService extends Service {

    constructor(protected http: HttpClient) {
        super(http);
    }

    getUser(): Promise<UserProfile> {
        return this.get<UserProfile>('user');
    }
}
