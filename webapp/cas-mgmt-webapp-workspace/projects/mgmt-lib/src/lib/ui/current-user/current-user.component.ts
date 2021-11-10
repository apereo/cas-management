import { Component, Input, OnChanges } from '@angular/core';
import { UserProfile } from '@apereo/mgmt-lib/src/lib/model';
// import { UserService } from '@apereo/mgmt-lib/src/lib/ui';
// import { UserProfile } from '@apereo/mgmt-lib/src/lib/model';

@Component({
    selector: 'lib-current-user',
    templateUrl: './current-user.component.html',
    styleUrls: []
})
export class CurrentUserComponent implements OnChanges {

    @Input()
    user: UserProfile;
    
    attrs: { [key: string]: string }[] = [];
    perms: string[] = [];

    displayedColumns = [];

    userInfo = '';

    ngOnChanges(): void {
        if (this.user) {
            const u = this.user;
            this.userInfo = [
                u.displayName || `${u.firstName} ${u.familyName}`,
                u.email,
                u.department
            ].filter(v => !v).join(' | ');

            this.attrs = [
                ...Object.keys(u.attributes).map(a => ({ label: a, value: u.attributes[a] }))
            ];

            this.perms = u.permissions
        }
        
    }
    
}