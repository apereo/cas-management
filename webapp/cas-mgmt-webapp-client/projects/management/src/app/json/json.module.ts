/**
 * Created by tsschmi on 3/14/17.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {JSONComponent} from './json.component';
import {JSONResolver} from './json.resolover';
import {SharedModule} from 'mgmt-lib';
import {MgmtModule} from '../mgmt.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MgmtModule
  ],
  declarations: [
    JSONComponent
  ],
  exports: [
    JSONComponent
  ],
  providers: [
    JSONResolver
  ]
})

export class JSONModule {}




