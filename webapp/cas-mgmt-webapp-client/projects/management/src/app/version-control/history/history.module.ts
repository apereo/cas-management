import { NgModule } from '@angular/core';

import { HistoryRoutingModule } from './history-routing.module';
import {HistoryComponent} from '@app/version-control/history/history.component';
import {ProjectShareModule} from '@app/project-share';

@NgModule({
  declarations: [
    HistoryComponent
  ],
  imports: [
    ProjectShareModule,
    HistoryRoutingModule
  ]
})
export class HistoryModule { }
