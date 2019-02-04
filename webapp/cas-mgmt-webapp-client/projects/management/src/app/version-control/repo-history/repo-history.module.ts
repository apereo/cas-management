import { NgModule } from '@angular/core';

import { RepoHistoryRoutingModule } from './repo-history-routing.module';
import {RepoHistoryComponent} from '@app/version-control/repo-history/repo-history.component';
import {ProjectShareModule} from '@app/project-share';

@NgModule({
  declarations: [
    RepoHistoryComponent
  ],
  imports: [
    ProjectShareModule,
    RepoHistoryRoutingModule
  ]
})
export class RepoHistoryModule { }
