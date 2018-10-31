import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotesComponent} from './notes.component';
import {NotesService} from './notes.service';
import {SharedModule} from 'mgmt-lib';
import {MgmtModule} from '../mgmt.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MgmtModule
  ],
  declarations: [ NotesComponent],
  providers : [ NotesService]
})
export class NotesModule { }
