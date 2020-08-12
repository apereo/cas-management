import {NgModule} from '@angular/core';
import {CommitHistoryRoutingModule} from './commit-history-routing.module';
import {CommitHistoryComponent} from './commit-history.component';
import {ProjectShareModule} from '../../project-share/project-share.module';

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
