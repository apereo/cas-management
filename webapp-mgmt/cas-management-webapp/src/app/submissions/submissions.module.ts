/**
 * Created by tschmidt on 2/23/17.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {SubmissionsComponent} from './submissions.component';
import {SubmissionsResolve} from './submissions.resolover';
import {SubmissionsService} from './submissions.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    SubmissionsComponent
  ],
  providers: [
    SubmissionsResolve,
    SubmissionsService
  ]
})

export class SubmissionsModule {}

