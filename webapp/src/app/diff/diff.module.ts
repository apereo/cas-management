/**
 * Created by tsschmi on 3/14/17.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DiffComponent} from './diff.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    DiffComponent
  ],
  exports: [
    DiffComponent
  ]
})

export class DiffModule {}




