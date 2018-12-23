import { NgModule } from '@angular/core';

import { VersionControlRoutingModule } from './version-control-routing.module';
import {ChangesComponent} from './changes/changes.component';
import {CommitHistoryComponent} from './commit-history/commit-history.component';
import {HistoryComponent} from './history/history.component';
import {LocalChangesComponent} from './local-changes/local-changes.component';
import {RepoHistoryComponent} from './repo-history/repo-history.component';
import {ProjectShareModule} from '@app/project-share';

@NgModule({
  declarations: [
    ChangesComponent,
    CommitHistoryComponent,
    HistoryComponent,
    LocalChangesComponent,
    RepoHistoryComponent,
  ],
  imports: [
    ProjectShareModule,
    VersionControlRoutingModule
  ]
})
export class VersionControlModule { }
