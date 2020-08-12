import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlsComponent} from './controls/controls.component';
import {MgmtLibModule} from 'mgmt-lib';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {CommitComponent} from './commit/commit.component';
import {PublishComponent} from './publish/publish.component';
import {RevertComponent} from './revert/revert.component';
import {SharedLibModule} from 'shared-lib';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AcceptComponent} from '@app/project-share/accept/accept.component';
import {RejectComponent} from '@app/project-share/reject/reject.component';

@NgModule({
  declarations: [
    ControlsComponent,
    CommitComponent,
    PublishComponent,
    RevertComponent,
    AcceptComponent,
    RejectComponent
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
    RouterModule,
    FlexLayoutModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MgmtLibModule,
    HttpClientModule,
    RouterModule,
    ControlsComponent,
    AcceptComponent,
    RejectComponent,
    SharedLibModule,
    FlexLayoutModule
  ]
})
export class ProjectShareModule { }
