import { NgModule } from '@angular/core';
import { RepoHistoryRoutingModule } from './repo-history-routing.module';
import {RepoHistoryComponent} from './repo-history.component';
import {ProjectShareModule} from '../../project-share/project-share.module';

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
