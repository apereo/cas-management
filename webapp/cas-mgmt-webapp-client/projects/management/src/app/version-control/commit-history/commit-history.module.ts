import { NgModule } from '@angular/core';

import { CommitHistoryRoutingModule } from './commit-history-routing.module';
import {CommitHistoryComponent} from '@app/version-control/commit-history/commit-history.component';
import {ProjectShareModule} from '@app/project-share';

@NgModule({
  declarations: [
    CommitHistoryComponent
  ],
  imports: [
    ProjectShareModule,
    CommitHistoryRoutingModule
  ]
})
export class CommitHistoryModule { }
