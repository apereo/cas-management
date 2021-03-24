import { NgModule } from '@angular/core';
import {SubmissionsComponent} from './submissions.component';
import {SubmissionsRoutingModule} from './submissions-routing.module';
import {CommonModule} from '@angular/common';
import {UiModule} from '@apereo/mgmt-lib/src/lib/ui';
import {FlexModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';

/**
 * Module to lazy-load submission functionality for the application.
 */
@NgModule({
  imports: [
    CommonModule,
    UiModule,
    FlexModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatSortModule,
    MatButtonModule,
    SubmissionsRoutingModule
  ],
  declarations: [
    SubmissionsComponent
  ]
})

export class SubmissionsModule {}

