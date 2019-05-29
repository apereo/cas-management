import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MgmtLibModule, SharedModule} from 'mgmt-lib';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTreeModule } from '@angular/material/tree';
import {SpinnerComponent} from 'mgmt-lib';

@NgModule({
  declarations: [
  ],
  entryComponents: [
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    MgmtLibModule,
    SharedModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatTreeModule,
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
    MatProgressSpinnerModule,
    MatTreeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ]
})
export class ProjectShareModule { }
