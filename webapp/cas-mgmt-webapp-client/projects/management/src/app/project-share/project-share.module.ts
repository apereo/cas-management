import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ControlsComponent} from './controls/controls.component';
import {EditorComponent} from './editor.component';
import {MgmtLibModule, SharedModule, SpinnerComponent} from 'mgmt-lib';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {ViewComponent} from './view/view.component';
import {CommitComponent} from './commit/commit.component';
import {PublishComponent} from './publish/publish.component';
import {RevertComponent} from './revert/revert.component';
import { EditorOptionsComponent } from './editor-options/editor-options.component';
import {AddComponent} from '@app/project-share/add/add.component';

@NgModule({
  declarations: [
    ControlsComponent,
    ViewComponent,
    EditorComponent,
    CommitComponent,
    PublishComponent,
    RevertComponent,
    EditorOptionsComponent,
    AddComponent
  ],
  entryComponents: [
    ViewComponent,
    CommitComponent,
    PublishComponent,
    RevertComponent,
    SpinnerComponent,
    EditorOptionsComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MgmtLibModule,
    SharedModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MgmtLibModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
    ControlsComponent,
    ViewComponent,
    EditorComponent,
    EditorOptionsComponent,
    AddComponent
  ]
})
export class ProjectShareModule { }
