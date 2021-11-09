import { Component } from '@angular/core';
import { UserService } from '@apereo/mgmt-lib/src/lib/ui';
import { UserProfile } from '@apereo/mgmt-lib/src/lib/model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'lib-current-user',
    templateUrl: './current-user.component.html',
    styleUrls: []
})
export class CurrentUserComponent {

    usr: Observable<UserProfile> = this.user.getUser();
    
    attrs: Observable<{[key:string]: string}[]> = this.usr.pipe(map((u: UserProfile) => [
            ...Object.keys(u.attributes).map(a => ({ label: a, value: u.attributes[a] }))
        ]
    ));

    perms: Observable<string[]> = this.usr.pipe(map((u: UserProfile) => u.permissions));

    displayedColumns = this.attrs.pipe(map(c => c.map(l => l.label)));

    userInfo = this.usr.pipe(map((u: UserProfile) => [
        u.displayName || `${u.firstName} ${u.familyName}`,
        u.email,
        u.department
    ].filter(v => !v).join(' | ')))

    constructor(
        private user: UserService
    ) {}
}