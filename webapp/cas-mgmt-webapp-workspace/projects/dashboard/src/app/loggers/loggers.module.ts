import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ProjectShareModule} from '../project-share/project-share.module';
import {MatDialogModule} from '@angular/material';
import {LoggersComponent} from './loggers.component';
import {LoggersRoutingModule} from './loggers-routing.module';

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
