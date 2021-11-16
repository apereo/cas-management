import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { UserProfile } from '@apereo/mgmt-lib/src/lib/model';
import { Observable } from 'rxjs';


@Component({
    selector: 'lib-current-user-dialog',
    templateUrl: 'current-user-dialog.component.html',
})
export class CurrentUserDialog {

    usr: Observable<UserProfile> = this.service.getUser();

    constructor(
        public dialogRef: MatDialogRef<CurrentUserDialog>,
        public service: UserService
    ) { }

    onOkClick(): void {
        this.dialogRef.close();
    }
}