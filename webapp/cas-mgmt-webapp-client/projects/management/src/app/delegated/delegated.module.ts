import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AcceptComponent} from './accept/accept.component';
import {NotesComponent} from './notes/notes.component';
import {PullComponent} from './pull/pull.component';
import {RejectComponent} from './reject/reject.component';
import {SubmitsComponent} from './submits/submits.component';
import {FormsModule} from '@angular/forms';
import {ProjectShareModule} from '../project-share/project-share.module';

@NgModule({
  imports: [
    ProjectShareModule
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
