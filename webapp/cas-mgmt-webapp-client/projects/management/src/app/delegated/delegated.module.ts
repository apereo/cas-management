import { NgModule } from '@angular/core';

import { DelegatedRoutingModule } from './delegated-routing.module';
import {AcceptComponent} from './accept/accept.component';
import {NotesComponent} from './notes/notes.component';
import {PullComponent} from './pull/pull.component';
import {RejectComponent} from './reject/reject.component';
import {SubmitsComponent} from './submits/submits.component';
import {ProjectShareModule} from '../project-share/project-share.module';

@NgModule({
  declarations: [
    AcceptComponent,
    NotesComponent,
    PullComponent,
    RejectComponent,
    SubmitsComponent
  ],
  imports: [
    ProjectShareModule,
    DelegatedRoutingModule
  ]
})
export class DelegatedModule { }
