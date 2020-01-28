import { NgModule } from '@angular/core';

import { NotesRoutingModule } from './notes-routing.module';
import {NotesComponent} from './notes.component';
import {ProjectShareModule} from '../../project-share/project-share.module';

@NgModule({
  declarations: [
    NotesComponent
  ],
  imports: [
    ProjectShareModule,
    NotesRoutingModule
  ]
})
export class NotesModule { }
