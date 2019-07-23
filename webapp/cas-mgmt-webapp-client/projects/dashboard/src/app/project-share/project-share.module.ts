import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MgmtLibModule } from 'mgmt-lib';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTreeModule } from '@angular/material/tree';
import {SharedLibModule} from 'shared-lib';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MgmtLibModule,
    SharedLibModule,
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
    SharedLibModule,
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
