import { NgModule } from '@angular/core';
import {ChangesComponent} from './changes/changes.component';
import {CommitComponent} from './commit/commit.component';
import {CommitHistoryComponent} from './commit-history/commit-history.component';
import {DiffComponent} from './diff/diff.component';
import {DiffViewComponent} from './diff-view/diff-view.component';
import {HistoryComponent} from './history/history.component';
import {LocalChangesComponent} from './local-changes/local-changes.component';
import {PublishComponent} from './publish/publish.component';
import {RepoHistoryComponent} from './repo-history/repo-history.component';
import {RevertComponent} from './revert/revert.component';
import {ProjectShareModule} from '../project-share/project-share.module';
import {VersionControlRoutingModule} from './version-control-routing.module';

@NgModule({
  imports: [
    ProjectShareModule,
    VersionControlRoutingModule
  ],
  declarations: [
    ChangesComponent,
    CommitComponent,
    CommitHistoryComponent,
    DiffComponent,
    DiffViewComponent,
    HistoryComponent,
    LocalChangesComponent,
    PublishComponent,
    RepoHistoryComponent,
    RevertComponent
  ]
})
export class VersionControlModule { }
