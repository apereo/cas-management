import { NgModule } from '@angular/core';
import {AcceptComponent} from './accept/accept.component';
import {NotesComponent} from './notes/notes.component';
import {PullComponent} from './pull/pull.component';
import {RejectComponent} from './reject/reject.component';
import {SubmitsComponent} from './submits/submits.component';
import {ProjectShareModule} from '../project-share/project-share.module';
import {DelegatedRoutingModule} from './delegated-routing.module';

@NgModule({
  imports: [
    ProjectShareModule,
    DelegatedRoutingModule
  ],
  declarations: [
    AcceptComponent,
    NotesComponent,
    PullComponent,
    RejectComponent,
    SubmitsComponent
  ]
})
export class DelegatedModule { }
