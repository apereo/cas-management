import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ProjectShareModule} from '../project-share/project-share.module';
import { MatDialogModule } from '@angular/material/dialog';
import {LoggersComponent} from './loggers.component';
import {LoggersRoutingModule} from './loggers-routing.module';

/**
 * Module for lazy-loading logger functionality.
 *
 * @author Travis Schmidt
 */
@NgModule({
  declarations: [
    LoggersComponent,
  ],
  imports: [
    CommonModule,
    ProjectShareModule,
    MatDialogModule,
    LoggersRoutingModule
  ]
})
export class LoggersModule { }
