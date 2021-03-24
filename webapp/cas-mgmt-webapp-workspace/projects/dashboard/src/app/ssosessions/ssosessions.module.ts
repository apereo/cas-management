import { NgModule } from '@angular/core';

import { SsosessionsRoutingModule } from './ssosessions-routing.module';
import {SsosessionsComponent} from './ssosessions.component';
import {ProjectShareModule} from '../project-share/project-share.module';
import { DetailComponent } from './detail/detail.component';
import {CommonModule} from '@angular/common';

/**
 * Module to lazy-load sso session functionality.
 *
 * @author Travis Schmidt
 */
@NgModule({
  declarations: [
    SsosessionsComponent,
    DetailComponent
  ],
  entryComponents: [
    DetailComponent
  ],
  imports: [
    CommonModule,
    ProjectShareModule,
    SsosessionsRoutingModule
  ]
})
export class SsosessionsModule { }
