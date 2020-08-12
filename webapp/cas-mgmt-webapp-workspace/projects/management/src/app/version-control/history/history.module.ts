import {NgModule} from '@angular/core';
import {HistoryRoutingModule} from './history-routing.module';
import {HistoryComponent} from './history.component';
import {ProjectShareModule} from '../../project-share/project-share.module';

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
