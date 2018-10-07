/**
 * Created by tsschmi on 3/14/17.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {JSONComponent} from './json.component';
import {JSONResolver} from './json.resolover';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
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




