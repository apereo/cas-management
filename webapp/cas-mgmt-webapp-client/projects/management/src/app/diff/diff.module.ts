/**
 * Created by tsschmi on 3/14/17.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DiffComponent} from './diff.component';
import {SharedModule} from 'mgmt-lib';
import {MgmtModule} from '../mgmt.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MgmtModule
  ],
  declarations: [
    DiffComponent
  ],
  exports: [
    DiffComponent
  ]
})

export class DiffModule {}




