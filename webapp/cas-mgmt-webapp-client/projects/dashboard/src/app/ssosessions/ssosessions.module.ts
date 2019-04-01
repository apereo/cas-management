import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
