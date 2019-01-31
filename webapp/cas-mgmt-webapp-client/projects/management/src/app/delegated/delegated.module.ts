import { NgModule } from '@angular/core';

import { DelegatedRoutingModule } from './delegated-routing.module';
import {NotesComponent} from './notes/notes.component';
import {PullComponent} from './pull/pull.component';
import {SubmitsComponent} from './submits/submits.component';
import {ProjectShareModule} from '../project-share/project-share.module';
import {AdminModule} from '../admin/admin.module';

@NgModule({
  declarations: [
    NotesComponent,
    PullComponent,
    SubmitsComponent
  ],
  imports: [
    ProjectShareModule,
    AdminModule,
    DelegatedRoutingModule
  ]
})
export class DelegatedModule { }
