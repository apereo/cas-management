/**
 * Created by tschmidt on 2/23/17.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {SubmitsComponent} from './submits.component';
import {SubmitService} from './submits.service';
import {SharedModule} from '../shared/shared.module';
import {RevertComponent} from '../revert/revert.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    SharedModule
  ],
  declarations: [
    SubmitsComponent,
  ],
  providers: [
    SubmitService
  ]
})

export class SubmitModule {}
