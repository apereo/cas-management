import { NgModule } from '@angular/core';

import { NotesRoutingModule } from './notes-routing.module';
import {ProjectShareModule} from '@app/project-share';
import {NotesComponent} from '@app/delegated/notes/notes.component';

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
