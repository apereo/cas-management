import { NgModule } from '@angular/core';

import { DelegatedRoutingModule } from './delegated-routing.module';
import {CommonModule} from '@angular/common';
import {NotesComponent} from './notes/notes.component';
import {PullComponent} from './pull/pull.component';
import {SubmitsComponent} from './submits/submits.component';
import {UiModule} from '@apereo/mgmt-lib/src/lib/ui';
import {FlexModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';

/**
 * Module to lazy-load delegated functionality in the app.
 *
 * @author Travis Schmidt
 */
@NgModule({
  declarations: [
    NotesComponent,
    PullComponent,
    SubmitsComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    FlexModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    DelegatedRoutingModule
  ],
  exports: [
    NotesComponent,
    PullComponent,
    SubmitsComponent
  ]
})
export class DelegatedModule { }
