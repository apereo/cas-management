/**
 * Created by tschmidt on 2/23/17.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {SubmitsComponent} from './submits.component';
import {SubmitService} from './submits.service';
import {SharedModule} from '../shared/shared.module';
import {SubmitsResolver} from './submits.resolver';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
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
