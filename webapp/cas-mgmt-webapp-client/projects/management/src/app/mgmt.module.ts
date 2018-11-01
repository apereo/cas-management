import {NgModule} from '@angular/core';
import {SharedModule} from 'mgmt-lib';
import {CommonModule} from '@angular/common';
import {ControlsComponent} from './controls/controls.component';
import {EditorComponent} from './editor.component';
import {ControlsService} from './controls/controls.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    ControlsComponent,
    EditorComponent
  ],
  providers: [
    ControlsService
  ],
  exports: [
    ControlsComponent,
    EditorComponent
  ]
})
export class MgmtModule {}
