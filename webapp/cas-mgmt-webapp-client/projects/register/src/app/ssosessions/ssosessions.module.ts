import { NgModule } from '@angular/core';

import { SsosessionsRoutingModule } from './ssosessions-routing.module';
import {SsosessionsComponent} from './ssosessions.component';
import {ProjectShareModule} from '../project-share/project-share.module';

@NgModule({
  declarations: [
    SsosessionsComponent
  ],
  imports: [
    ProjectShareModule,
    SsosessionsRoutingModule
  ]
})
export class SsosessionsModule { }
