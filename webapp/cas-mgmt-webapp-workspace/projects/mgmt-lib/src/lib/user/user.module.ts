import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { UiModule } from '@apereo/mgmt-lib/src/lib/ui';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { UserRoutingModule } from './user-routing.module';
import { CurrentUserComponent } from './current-user/current-user.component';

/**
 * Module to lazy-load version control functionality for the application.
 */
@NgModule({
    declarations: [
        CurrentUserComponent
    ],
    imports: [
        CommonModule,
        UiModule,
        FlexModule,
        FormsModule,
        MatCardModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatButtonModule,
        UserRoutingModule
    ],
    exports: [
        CurrentUserComponent
    ]
})
export class UserModule { }
