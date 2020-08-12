import {NgModule} from '@angular/core';

import {SsosessionsRoutingModule} from './ssosessions-routing.module';
import {SsosessionsComponent} from './ssosessions.component';
import {ProjectShareModule} from '../project-share/project-share.module';
import {DetailComponent} from './detail/detail.component';

@NgModule({
  declarations: [
    SsosessionsComponent,
    DetailComponent
  ],
  entryComponents: [
    DetailComponent
  ],
  imports: [
    ProjectShareModule,
    SsosessionsRoutingModule
  ]
})
export class SsosessionsModule { }
