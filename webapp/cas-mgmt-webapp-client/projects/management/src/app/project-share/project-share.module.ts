import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditorComponent} from './editor.component';
import {ControlsComponent} from './controls/controls.component';
import {MgmtLibModule} from 'mgmt-lib';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ControlsComponent,
    EditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MgmtLibModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    MgmtLibModule,
    ControlsComponent,
    EditorComponent
  ]
})
export class ProjectShareModule { }
