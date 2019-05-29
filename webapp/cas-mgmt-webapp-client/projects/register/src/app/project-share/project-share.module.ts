import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ControlsComponent} from './controls/controls.component';
import {MgmtLibModule, SharedModule} from 'mgmt-lib';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddContactComponent} from './add-contact/add-contact.component';
import {DeleteComponent} from './delete/delete.component';
import {SubmitComponent} from './submit/submit.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { MatStepperModule } from '@angular/material/stepper';
import {SpinnerComponent} from 'mgmt-lib';

@NgModule({
  declarations: [
    ControlsComponent,
    AddContactComponent,
    DeleteComponent,
    SubmitComponent
  ],
  entryComponents: [
    DeleteComponent,
    AddContactComponent,
    SubmitComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    MgmtLibModule,
    SharedModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    MgmtLibModule,
    SharedModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    ControlsComponent,
    AddContactComponent,
    DeleteComponent,
    SubmitComponent
  ]
})
export class ProjectShareModule { }
