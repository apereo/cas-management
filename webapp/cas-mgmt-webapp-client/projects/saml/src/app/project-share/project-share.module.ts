import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ControlsComponent} from './controls/controls.component';
import {MgmtLibModule, SharedModule} from 'mgmt-lib';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DeleteComponent} from './delete/delete.component';
import {SubmitComponent} from './submit/submit.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { AddComponent } from './add/add.component';
import {SpinnerComponent} from 'mgmt-lib';

@NgModule({
  declarations: [
    ControlsComponent,
    DeleteComponent,
    SubmitComponent,
    AddComponent
  ],
  entryComponents: [
    DeleteComponent,
    SubmitComponent,
    AddComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    MgmtLibModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    MgmtLibModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    ControlsComponent,
    DeleteComponent,
    SubmitComponent,
    AddComponent
  ]
})
export class ProjectShareModule { }
