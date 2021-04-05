import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {PendingRoutingModule} from './pending-routing.module';
import {PendingComponent} from './pending.component';
import {ProjectShareModule} from '../project-share/project-share.module';

/**
 * Module to lazy-load functionality for pending submissions.
 *
 * @author Travis Schmidt
 */
@NgModule({
  declarations: [
    PendingComponent
  ],
  imports: [
    CommonModule,
    ProjectShareModule,
    PendingRoutingModule
  ]
})
export class PendingModule { }
