import { NgModule } from '@angular/core';

import { VersionControlRoutingModule } from './version-control-routing.module';
import {BaseHistoryComponent} from './base-history.component';
import {CommonModule} from '@angular/common';
import {UiModule} from '@apereo/mgmt-lib/src/lib/ui';
import {FlexModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {ChangesComponent} from './changes/changes.component';
import {CommitHistoryComponent} from './commit-history/commit-history.component';
import {HistoryComponent} from './history/history.component';
import {LocalChangesComponent} from './local-changes/local-changes.component';
import {RepoHistoryComponent} from './repo-history/repo-history.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * Module to lazy-load version control functionality for the application.
 */
@NgModule({
  declarations: [
    BaseHistoryComponent,
    ChangesComponent,
    CommitHistoryComponent,
    HistoryComponent,
    LocalChangesComponent,
    RepoHistoryComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    FlexModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    VersionControlRoutingModule
  ],
  exports: [
    BaseHistoryComponent,
    ChangesComponent,
    CommitHistoryComponent,
    HistoryComponent,
    LocalChangesComponent,
    RepoHistoryComponent
  ]
})
export class VersionControlModule { }
