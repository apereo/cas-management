import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ControlsComponent} from './controls/controls.component';
import {MgmtLibModule} from 'mgmt-lib';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {CommitComponent} from './commit/commit.component';
import {PublishComponent} from './publish/publish.component';
import {RevertComponent} from './revert/revert.component';
import {SharedLibModule} from 'shared-lib';

@NgModule({
  declarations: [
    ControlsComponent,
    CommitComponent,
    PublishComponent,
    RevertComponent,
  ],
  entryComponents: [
    CommitComponent,
    PublishComponent,
    RevertComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MgmtLibModule,
    SharedLibModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MgmtLibModule,
    HttpClientModule,
    RouterModule,
    ControlsComponent,
    SharedLibModule
  ]
})
export class ProjectShareModule { }
