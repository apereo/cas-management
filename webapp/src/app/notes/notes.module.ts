import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {NotesComponent} from './notes.component';
import {NotesService} from './notes.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [ NotesComponent],
  providers : [ NotesService]
})
export class NotesModule { }
