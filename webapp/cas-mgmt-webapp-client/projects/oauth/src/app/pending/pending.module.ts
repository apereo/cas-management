import { NgModule } from '@angular/core';

import { PendingRoutingModule } from './pending-routing.module';
import {PendingComponent} from './pending.component';
import {ProjectShareModule} from '../project-share/project-share.module';

@NgModule({
  declarations: [
    PendingComponent
  ],
  imports: [
    ProjectShareModule,
    PendingRoutingModule
  ]
})
export class PendingModule { }
