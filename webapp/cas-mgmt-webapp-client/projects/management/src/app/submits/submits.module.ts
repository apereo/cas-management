/**
 * Created by tschmidt on 2/23/17.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {SubmitsComponent} from './submits.component';
import {SubmitService} from './submits.service';
import {SubmitsResolver} from './submits.resolver';
import {SharedModule} from 'mgmt-lib';
import {MgmtModule} from '../mgmt.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MgmtModule
  ],
  declarations: [
    SubmitsComponent,
  ],
  providers: [
    SubmitService,
    SubmitsResolver
  ]
})

export class SubmitModule {}
